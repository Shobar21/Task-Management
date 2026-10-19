import React from "react";
import { useForm } from "react-hook-form";
import { Dialog } from "@headlessui/react";
import { toast } from "sonner";
import ModalWrapper from "./ModalWrapper";
import Textbox from "./Textbox";
import Loading from "./Loader";
import Button from "./Button";
import { useChangePasswordMutation } from "../redux/slices/api/userApiSlice";

const ChangePassword = ({ open, setOpen }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleOnSubmit = async (data) => {
    if (data.password !== data.cpass) {
      toast.warning("Passwords do not match");
      return;
    }

    try {
      const res = await changePassword({ password: data.password }).unwrap();
      toast.success(res?.message || "Password changed");
      reset();
      setTimeout(() => setOpen(false), 500);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <Dialog.Title
          as='h2'
          className='text-base font-bold leading-6 text-gray-900 mb-4'
        >
          CHANGE PASSWORD
        </Dialog.Title>

        <div className='mt-2 flex flex-col gap-6'>
          <Textbox
            placeholder='New password'
            type='password'
            name='password'
            label='New Password'
            className='w-full rounded'
            register={register("password", {
              required: "New password is required!",
              minLength: { value: 6, message: "Use at least 6 characters" },
            })}
            error={errors.password ? errors.password.message : ""}
          />
          <Textbox
            placeholder='Confirm new password'
            type='password'
            name='cpass'
            label='Confirm New Password'
            className='w-full rounded'
            register={register("cpass", {
              required: "Please confirm the new password!",
            })}
            error={errors.cpass ? errors.cpass.message : ""}
          />
        </div>

        {isLoading ? (
          <div className='py-5'>
            <Loading />
          </div>
        ) : (
          <div className='py-3 mt-4 sm:flex sm:flex-row-reverse'>
            <Button
              type='submit'
              className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto'
              label='Save'
            />
            <Button
              type='button'
              className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
              onClick={() => setOpen(false)}
              label='Cancel'
            />
          </div>
        )}
      </form>
    </ModalWrapper>
  );
};

export default ChangePassword;
