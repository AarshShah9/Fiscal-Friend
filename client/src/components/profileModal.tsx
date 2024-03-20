import { Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { URL } from '../utils/constants';

type ProfileUpdate = {
  email: string;
  firstName: string;
  lastName: string;
  // photo: string;
  password: string;
};

export default function ProfileModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (set: boolean) => void;
}) {
  const cancelButtonRef = useRef(null);
  const { user, setIsLoading, isLoading } = useAuth();
  const { register, handleSubmit, setValue } = useForm<ProfileUpdate>({
    defaultValues: {
      email: user?.email,
      firstName: user?.firstName,
      lastName: user?.lastName,
      password: '',
    },
  });

  useEffect(() => {
    setValue('email', user?.email!);
    setValue('firstName', user?.firstName!);
    setValue('lastName', user?.lastName!);
  }, [user, isLoading]);

  const onSubmit = (data: ProfileUpdate) => {
    const submitData = {
      email: data.email ? data.email : user!.email,
      firstName: data.firstName ? data.firstName : user!.firstName,
      lastName: data.lastName ? data.lastName : user!.lastName,
      password: data.password ? data.password : '',
    };

    axios.post(`${URL}/auth/updateMe`, submitData).then((res) => {
      setOpen(false);
      setIsLoading(true);
    });
  };

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="w-1/2 transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:p-6">
                  <form>
                    <div className="space-y-12">
                      <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                          Profile
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          This information is all confidential.
                        </p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                          <div className="col-span-full">
                            <label
                              htmlFor="photo"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Photo
                            </label>
                            <div className="mt-2 flex items-center gap-x-3">
                              <UserCircleIcon
                                className="h-12 w-12 text-gray-300"
                                aria-hidden="true"
                              />
                              <button
                                type="button"
                                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                              >
                                Change
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                          Personal Information
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          Use a permanent address where you can receive mail.
                        </p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                          <div className="sm:col-span-3">
                            <label
                              htmlFor="first-name"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              First name
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                id="first-name"
                                autoComplete="given-name"
                                {...register('firstName')}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-3">
                            <label
                              htmlFor="last-name"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Last name
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                id="last-name"
                                autoComplete="family-name"
                                {...register('lastName')}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                          <div className="sm:col-span-3">
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Email address
                            </label>
                            <div className="mt-2">
                              <input
                                id="email"
                                type="email"
                                autoComplete="email"
                                {...register('email')}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                          <div className="sm:col-span-3">
                            <label
                              htmlFor="password"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Password
                            </label>
                            <div className="mt-2">
                              <input
                                id="password"
                                type="password"
                                autoComplete="password"
                                {...register('password')}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                      <button
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 sm:col-start-2"
                        onClick={handleSubmit(onSubmit)}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
