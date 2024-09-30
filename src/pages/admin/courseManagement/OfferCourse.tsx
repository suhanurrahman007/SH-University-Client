import { Button, Col, Flex } from "antd";

import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useGetAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";
import SHForm from "../../../components/form/SHForm";
import SHSelectWithWatch from "../../../components/form/SHSelectwithWatch";
import SHInput from "../../../components/form/SHInput";

const OfferCourse = () => {
  const [id, setId] = useState("");

  console.log("Inside parent component", id);

  const { data: academicFacultyData } = useGetAcademicFacultiesQuery(undefined);

  const academicSemesterOptions = academicFacultyData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <SHForm onSubmit={onSubmit}>
          <SHSelectWithWatch
            onValueChange={setId}
            label="Academic Semester"
            name="academicSemester"
            options={academicSemesterOptions}
          />
          <SHInput disabled={!id} type="text" name="test" label="Test" />
          <Button htmlType="submit">Submit</Button>
        </SHForm>
      </Col>
    </Flex>
  );
};

export default OfferCourse;
