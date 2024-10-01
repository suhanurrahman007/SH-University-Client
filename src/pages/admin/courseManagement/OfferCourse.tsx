import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";

import { useState } from "react";
import moment from "moment";
import { useCreateOfferedCourseMutation, useGetAllCoursesQuery, useGetAllSemesterRegistrationQuery, useGetCourseFacultiesQuery } from "../../../redux/features/admin/courseManagement";
import { useGetAcademicDepartmentsQuery, useGetAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";
import SHForm from "../../../components/form/SHForm";
import SHSelect from "../../../components/form/SHSelect";
import SHSelectWithWatch from "../../../components/form/SHSelectwithWatch";
import SHInput from "../../../components/form/SHInput";
import SHTimePicker from "../../../components/form/SHTimePicker";
import { weekDaysOptions } from "../../../components/constants/global";



const OfferCourse = () => {
  const [courseId, setCourseId] = useState("");

  const [addOfferedCourse] = useCreateOfferedCourseMutation();

  const { data: semesterData } =
    useGetAllSemesterRegistrationQuery(undefined);

  const { data: academicFacultyData } = useGetAcademicFacultiesQuery(undefined);

  const { data: academicDepartmentData } =
    useGetAcademicDepartmentsQuery(undefined);

  const { data: coursesData } = useGetAllCoursesQuery(undefined);

  const { data: facultiesData, isFetching: fetchingFaculties } =
    useGetCourseFacultiesQuery(courseId, { skip: !courseId });

  const semesterRegistrationOptions = semesterData?.data?.map((item) => ({
    value: item._id,
    label: `${item.academicSemester.name} ${item.academicSemester.year}`,
  }));

  const academicFacultyOptions = academicFacultyData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const academicDepartmentOptions = academicDepartmentData?.data?.map(
    (item) => ({
      value: item._id,
      label: item.name,
    })
  );

  const courseOptions = coursesData?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  const facultiesOptions = facultiesData?.data?.faculties?.map((item: FieldValues) => ({
    value: item._id,
    label: item.fullName,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const offeredCourseData = {
      ...data,
      maxCapacity: Number(data.maxCapacity),
      section: Number(data.section),
      startTime: moment(new Date(data.startTime)).format("HH:mm"),
      endTime: moment(new Date(data.endTime)).format("HH:mm"),
    };
    console.log(offeredCourseData);

    const res = await addOfferedCourse(offeredCourseData);
    console.log(res);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={10}>
        <SHForm onSubmit={onSubmit}>
          <SHSelect
            name="semesterRegistration"
            label="Semester Registrations"
            options={semesterRegistrationOptions}
          />
          <SHSelect
            name="academicFaculty"
            label="Academic Faculty"
            options={academicFacultyOptions}
          />
          <SHSelect
            name="academicDepartment"
            label="Academic Department"
            options={academicDepartmentOptions}
          />
          <SHSelectWithWatch
            onValueChange={setCourseId}
            options={courseOptions}
            name="course"
            label="Course"
          />
          <SHSelect
            disabled={!courseId || fetchingFaculties}
            name="faculty"
            label="Faculty"
            options={facultiesOptions}
          />
          <SHInput type="number" name="section" label="Section" />
          <SHInput type="number" name="maxCapacity" label="Max Capacity" />
          <SHSelect
            mode="multiple"
            options={weekDaysOptions}
            name="days"
            label="Days"
          />
          <SHTimePicker name="startTime" label="Start Time" />
          <SHTimePicker name="endTime" label="End Time" />

          <Button htmlType="submit">Submit</Button>
        </SHForm>
      </Col>
    </Flex>
  );
};

export default OfferCourse;
