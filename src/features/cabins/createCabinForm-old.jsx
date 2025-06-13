// import styled from "styled-components";

// import Input from "../../ui/Input";
// import Form from "../../ui/Form";
// import Button from "../../ui/Button";
// import FileInput from "../../ui/FileInput";
// import Textarea from "../../ui/Textarea";
// import { useForm } from "react-hook-form";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { addCabin } from "../../services/apicabins";
// import toast from "react-hot-toast";
// import FormRow from "../../ui/FormRow";

// function CreateCabinForm() {
//   const { register, handleSubmit, reset, getValues, formState } = useForm();
//   const { errors } = formState;
//   console.log(errors);
//   const queryClient = useQueryClient();
//   const { mutate, isLoading } = useMutation({
//     mutationFn: addCabin,
//     onSuccess: (newCabin) => {
//       toast.success(`Cabin ${newCabin[0].name} created successfully 😁`);
//       queryClient.invalidateQueries({ queryKey: ["cabin"] });
//       reset();
//     },
//     onError: () => toast.error("Cabin cannot be created."),
//   });

//   function onSubmit(data) {
//     // mutate(data);
//     mutate({ ...data, image: data.image[0] });
//   }

//   function onError(errors) {
//     // console.log(errors);
//   }

//   return (
//     <Form onSubmit={handleSubmit(onSubmit, onError)}>
//       <FormRow label="Cabin name" error={errors?.name?.message}>
//         <Input
//           type="text"
//           id="name"
//           disabled={isLoading}
//           {...register("name", { required: "This field is required" })}
//         />
//       </FormRow>

//       <FormRow label="maximum Capacity" error={errors?.maxCapacity?.message}>
//         <Input
//           type="number"
//           id="maxCapacity"
//           min={0}
//           disabled={isLoading}
//           {...register("maxCapacity", {
//             required: "This field is required",
//             min: { value: 1, message: "The minmum capacity is 1 guest" },
//           })}
//         />
//       </FormRow>

//       <FormRow label="Regular price" error={errors?.regularPrice?.message}>
//         <Input
//           type="number"
//           id="regularPrice"
//           disabled={isLoading}
//           min={1}
//           {...register("regularPrice", {
//             required: "This field is required",
//             min: { value: 1, message: "Price cannot be 0" },
//           })}
//         />
//       </FormRow>

//       <FormRow label="Discount" error={errors?.discount?.message}>
//         <Input
//           type="number"
//           id="discount"
//           defaultValue={0}
//           disabled={isLoading}
//           min={0}
//           {...register("discount", {
//             required: "This field is required",
//             validate: (value) =>
//               value <= getValues().regularPrice ||
//               "Discount should be less than the regular price",
//           })}
//         />
//       </FormRow>

//       <FormRow label="Description" error={errors?.description?.message}>
//         <Textarea
//           type="number"
//           id="description"
//           disabled={isLoading}
//           defaultValue=""
//           {...register("description", { required: "This field is required" })}
//         />
//       </FormRow>

//       <FormRow label="Cabin photo">
//         <FileInput
//           disabled={isLoading}
//           id="image"
//           accept="image/*"
//           {...register("image", { required: "This field is required" })}
//         />
//       </FormRow>

//       <FormRow>
//         {/* type is an HTML attribute! */}
//         <Button variation="secondary" type="reset">
//           Cancel
//         </Button>
//         <Button disabled={isLoading}>Add cabin</Button>
//       </FormRow>
//     </Form>
//   );
// }

// export default CreateCabinForm;

// old form before refactoring
// <Form onSubmit={handleSubmit(onSubmit, onError)}>
//   <FormRow2>
//     <Label htmlFor="name">Cabin name</Label>
//     <Input
//       type="text"
//       id="name"
//       {...register("name", { required: "This field is required" })}
//     />
//     {errors?.name?.message && <Error>{errors.name.message}</Error>}
//   </FormRow2>

//   <FormRow2>
//     <Label htmlFor="maxCapacity">Maximum capacity</Label>
//     <Input
//       type="number"
//       id="maxCapacity"
//       {...register("maxCapacity", {
//         required: "This field is required",
//         min: { value: 1, message: "The minmum capacity is 1 guest" },
//       })}
//     />
//   </FormRow2>

//   <FormRow2>
//     <Label htmlFor="regularPrice">Regular price</Label>
//     <Input
//       type="number"
//       id="regularPrice"
//       {...register("regularPrice", {
//         required: "This field is required",
//         min: { value: 1, message: "Price cannot be 0" },
//       })}
//     />
//   </FormRow2>

//   <FormRow2>
//     <Label htmlFor="discount">Discount</Label>
//     <Input
//       type="number"
//       id="discount"
//       defaultValue={0}
//       {...register("discount", {
//         required: "This field is required",
//         validate: (value) =>
//           value <= getValues().regularPrice ||
//           "Discount should be less than the regular price",
//       })}
//     />
//   </FormRow2>

//   <FormRow2>
//     <Label htmlFor="description">Description for website</Label>
//     <Textarea
//       type="number"
//       id="description"
//       defaultValue=""
//       {...register("description", { required: "This field is required" })}
//     />
//   </FormRow2>

//   <FormRow2>
//     <Label htmlFor="image">Cabin photo</Label>
//     <FileInput id="image" accept="image/*" />
//   </FormRow2>

//   <FormRow2>
//     {/* type is an HTML attribute! */}
//     <Button variation="secondary" type="reset">
//       Cancel
//     </Button>
//     <Button disabled={isLoading}>Add cabin</Button>
//   </FormRow2>
// </Form>
