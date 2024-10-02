import { Button, Col, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useGetAllFacultyCoursesQuery } from "../../redux/features/faculty/facultyCourseApi";
import SHForm from "../../components/form/SHForm";
import SHSelect from "../../components/form/SHSelect";

const MyCourses = () => {
  const { data: facultyCoursesData } = useGetAllFacultyCoursesQuery(undefined);
  console.log(facultyCoursesData);
  const navigate = useNavigate();

  console.log(facultyCoursesData);

  const semesterOptions = facultyCoursesData?.data?.map(
    (item: FieldValues) => ({
      label: `${item.academicSemester.name} ${item.academicSemester.year}`,
      value: item.semesterRegistration._id,
    })
  );

  const courseOptions = facultyCoursesData?.data?.map((item: FieldValues) => ({
    label: item.course.title,
    value: item.course._id,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    navigate(`/faculty/courses/${data.semesterRegistration}/${data.course}`);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <SHForm onSubmit={onSubmit}>
          <SHSelect
            options={semesterOptions}
            name="semesterRegistration"
            label="Semester"
          />
          <SHSelect options={courseOptions} name="course" label="Course" />
          <Button htmlType="submit">Submit</Button>
        </SHForm>
      </Col>
    </Flex>
  );
};

export default MyCourses;
