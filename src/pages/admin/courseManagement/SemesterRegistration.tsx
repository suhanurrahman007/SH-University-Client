import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Col, Flex } from "antd";
import { toast } from "sonner";
import { useAddSemesterRegistrationMutation } from "../../../redux/features/admin/courseManagement";
import { useGetAllAcademicSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { TResponse } from "../../../types";
import SHForm from "../../../components/form/SHForm";
import SHSelect from "../../../components/form/SHSelect";
import SHDatePicker from "../../../components/form/SHDatePicker";
import SHInput from "../../../components/form/SHInput";
import { semesterStatusOptions } from "../../../components/constants/semester";


const SemesterRegistration = () => {
  const [addSemester] = useAddSemesterRegistrationMutation();
  const { data: academicSemester } = useGetAllAcademicSemestersQuery([
    { name: "sort", value: "year" },
  ]);

  const academicSemesterOptions = academicSemester?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const semesterData = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
    };

    console.log(semesterData);

    try {
      const res = (await addSemester(semesterData)) as TResponse<any>;
      console.log(res);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Semester created", { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={10}>
        <SHForm onSubmit={onSubmit}>
          <SHSelect
            label="Academic Semester"
            name="academicSemester"
            options={academicSemesterOptions}
          />

          <SHSelect
            name="status"
            label="Status"
            options={semesterStatusOptions}
          />
          <SHDatePicker name="startDate" label="Start Date" />
          <SHDatePicker name="endDate" label="End Date" />
          <SHInput type="text" name="minCredit" label="Min Credit" />
          <SHInput type="text" name="maxCredit" label="Max Credit" />

          <Button htmlType="submit">Submit</Button>
        </SHForm>
      </Col>
    </Flex>
  );
};

export default SemesterRegistration;
