/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Col, Flex } from "antd";
import { toast } from "sonner";
import { TResponse } from "../../../types";
import SHForm from "../../../components/form/SHForm";
import SHInput from "../../../components/form/SHInput";
import SHSelect from "../../../components/form/SHSelect";
import { useAddCourseMutation, useGetAllCoursesQuery } from "../../../redux/features/admin/courseManagement";

const CreateCourse = () => {
  const [createCourse] = useAddCourseMutation();
  const { data: courses } = useGetAllCoursesQuery(undefined);

  const preRequisiteCoursesOptions = courses?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const courseData = {
      ...data,
      code: Number(data.code),
      credits: Number(data.credits),
      isDeleted: false,
      preRequisiteCourses: data.preRequisiteCourses
        ? data.preRequisiteCourses?.map((item: any) => ({
            course: item,
            isDeleted: false,
          }))
        : [],
    };

    console.log(courseData);

    try {
      const res = (await createCourse(courseData)) as TResponse<any>;
      console.log(res);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Course created", { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={10}>
        <SHForm onSubmit={onSubmit}>
          <SHInput type="text" name="title" label="Title" />
          <SHInput type="text" name="prefix" label="Prefix" />
          <SHInput type="text" name="code" label="Code" />
          <SHInput type="text" name="credits" label="Credits" />
          <SHSelect
            mode="multiple"
            options={preRequisiteCoursesOptions}
            name="preRequisiteCourses"
            label="preRequisiteCourses"
          />
          <Button htmlType="submit">Submit</Button>
        </SHForm>
      </Col>
    </Flex>
  );
};

export default CreateCourse;
