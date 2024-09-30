import { FieldValues, SubmitHandler } from "react-hook-form";
import SHForm from "../../../components/form/SHForm";
import { Button, Col, Flex } from "antd";
import SHSelect from "../../../components/form/SHSelect";
import { semesterOptions } from "../../../components/constants/semester";
import { monthOptions } from "../../../components/constants/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../schemas/academicManagement.schema";
import { useAddAcademicSemestersMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types/global";

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
  value: String(currentYear + number),
  label: String(currentYear + number),
}));
const CreateAcademicSemester = () => {
  const [addAcademicSemester] = useAddAcademicSemestersMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {

    const tostId = toast.loading('Creating...!')
    const name = semesterOptions[Number(data.name) - 1].label;

    const semesterData = {
      name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };

    try {
      const res = (await addAcademicSemester(semesterData)) as TResponse<any>;
      if (res.error) {
        toast.error(res?.error?.data?.message, { id: tostId });
      } else {
        toast.success("Academic Semester Created", { id: tostId });
      }
    } catch (error) {
      toast.error("Something went wrong...!!", { id: tostId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={10}>
        <SHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicSemesterSchema)}
        >
          <SHSelect label="Name" name="name" options={semesterOptions} />
          <SHSelect label="Year" name="year" options={yearOptions} />
          <SHSelect
            label="Start Month"
            name="startMonth"
            options={monthOptions}
          />
          <SHSelect label="End Month" name="endMonth" options={monthOptions} />
          <Button htmlType="submit">Submit</Button>
        </SHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
