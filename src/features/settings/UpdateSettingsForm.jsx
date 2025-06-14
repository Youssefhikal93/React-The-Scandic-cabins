import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "./useSettimgs";
import Spinner from "../../ui/Spinner";
import toast from "react-hot-toast";
import { useUpdateSettings } from "./useUpdateSettings";
import { updateSetting } from "../../services/apiSettings";

function UpdateSettingsForm() {
  const { isLoading, settings, error } = useSettings();

  const { isEditing, editSetting } = useUpdateSettings();

  function handelUpdate(e, field) {
    const { value } = e.target;
    if (!value) return;
    editSetting({ [field]: value });
  }

  if (isLoading) return <Spinner />;
  if (error) return toast.error("Couldn't get the default settings.");

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={settings?.minBookingLength}
          disabled={isEditing}
          onBlur={(e) => handelUpdate(e, "minBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={settings?.maxBookingLength}
          disabled={isEditing}
          onBlur={(e) => handelUpdate(e, "maxBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={settings?.maxGuestsPerBooking}
          disabled={isEditing}
          onBlur={(e) => handelUpdate(e, "maxGuestsPerBooking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={settings?.breakfastPrice}
          disabled={isEditing}
          onBlur={(e) => handelUpdate(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}
export default UpdateSettingsForm;
