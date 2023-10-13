import { Button, Flex, Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import FormSelect from "../../components/formComponents/FormSelect";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PageNumbers } from "../../interface/home";
import { IInterViewSettings } from "../../interface/forms";
import {
  interviewDurationOptions,
  interviewLanguageOptions,
  interviewModeOptions,
} from "./constants";

const InterviewDetailsForm: React.FC<{
  handleTab: (n: PageNumbers) => void;
  setInterviewSettings: React.Dispatch<React.SetStateAction<IInterViewSettings>>;
  interviewSettings: (IInterViewSettings);
}> = ({ handleTab, setInterviewSettings, interviewSettings }) => {
  const {
    errors,
    touched,
    handleSubmit,
    values,
    setFieldTouched,
    setFieldValue,
  } = useFormik<IInterViewSettings>({
    initialValues: {
      interviewMode: "",
      interviewDuration: "",
      interviewLanguage: "",
    },
    validationSchema: Yup.object().shape({
      interviewLanguage: Yup.string().required("Interview Language title is required"),
      interviewMode: Yup.string().required("Interview Mode is required"),
      interviewDuration: Yup.string().required("Interview Duration is required"),
    }),
    onSubmit: (values) => {
      // console.log({ values });
      alert("Form successfully submitted");
    },
  });
  useEffect(() => {
    setInterviewSettings({ ...interviewSettings, interviewMode: values?.interviewMode })
  }, [values?.interviewMode])
  useEffect(() => {
    setInterviewSettings({ ...interviewSettings, interviewDuration: values?.interviewDuration })
  }, [values?.interviewDuration])
  useEffect(() => {
    setInterviewSettings({ ...interviewSettings, interviewLanguage: values?.interviewLanguage })
  }, [values?.interviewLanguage])

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormSelect
          label="Interview Mode"
          placeholder="Select interview mode"
          name="interviewMode"
          options={interviewModeOptions}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          value={values?.interviewMode}
          error={errors?.interviewMode}
          touched={touched?.interviewMode}
        />
        <FormSelect
          label="Interview Duration"
          placeholder="Select interview duration"
          name="interviewDuration"
          options={interviewDurationOptions}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          value={values?.interviewDuration}
          error={errors?.interviewDuration}
          touched={touched?.interviewDuration}
        />
        <FormSelect
          label="Interview Language"
          name="interviewLanguage"
          placeholder="Select interview language"
          options={interviewLanguageOptions}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          error={errors.interviewLanguage}
          touched={touched.interviewLanguage}
          value={values.interviewLanguage}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button colorScheme="gray" type="button" onClick={() => handleTab(1)}>
            Previous
          </Button>
          <Button colorScheme="red" type="submit">
            Submit
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default InterviewDetailsForm;
