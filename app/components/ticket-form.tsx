import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useTicketStore } from "~/store/use-ticket-store";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "~/lib/utils";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

import InfoIcon from "~/assets/images/icon-info.svg?react";
import UploadIcon from "~/assets/images/icon-upload.svg?react";

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpg", "image/png"];

export const ticketFormSchema = z.object({
  avatar: z
    .any()
    .optional()
    .refine(
      (files) => !files || files.length === 0 || files[0].size <= MAX_FILE_SIZE,
      "File too large. Please upload a photo under 5MB."
    )
    .refine(
      (files) =>
        !files ||
        files.length === 0 ||
        ACCEPTED_IMAGE_TYPES.includes(files[0].type),
      "Only .jpg and .png formats are supported."
    ),
  fullName: z.string(),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  githubUsername: z.string(),
});

export const TicketForm = () => {
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    null
  );
  const { setTicket } = useTicketStore();
  let navigate = useNavigate();

  const form = useForm<z.infer<typeof ticketFormSchema>>({
    resolver: zodResolver(ticketFormSchema),
    defaultValues: {
      avatar: null,
      fullName: "",
      email: "",
      githubUsername: "",
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = new FileReader();

      file.onload = () => {
        setImagePreview(file.result);
      };

      if (acceptedFiles.length > 0) {
        file.readAsDataURL(acceptedFiles[0]);
        form.setValue("avatar", acceptedFiles, { shouldValidate: true });
      }
    },
    [form]
  );

  const { getRootProps, getInputProps, isDragActive, inputRef } = useDropzone({
    onDrop,
  });

  function onSubmit(values: z.infer<typeof ticketFormSchema>) {
    setTicket(values);

    navigate("/ticket");
  }

  const removeImage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setImagePreview(null);
  };

  const changeImage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    inputRef.current?.click();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="avatar"
          render={() => (
            <FormItem>
              <FormLabel
                className="data-[error=true]:text-neutral-300"
                id="file-input"
              >
                Upload Avatar
              </FormLabel>
              <FormControl>
                <div
                  {...(!imagePreview ? getRootProps() : {})}
                  className={cn(
                    "border-2 border-dashed border-neutral-700 rounded-md  transition-colors grid gap-5 place-content-center p-10 bg-white/5",
                    !imagePreview && "hover:bg-white/20"
                  )}
                >
                  <div className="grid gap-5 justify-items-center">
                    {imagePreview ? (
                      <>
                        <div className="size-20 grid place-content-center bg-white/20 border border-white/20 rounded-md">
                          <img
                            className="size-full"
                            src={imagePreview as string}
                            alt=""
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            className="bg-white/20 underline underline-offset-4 hover:bg-white/10"
                            type="button"
                            onClick={removeImage}
                          >
                            Remove Image
                          </Button>
                          <Button
                            className="bg-white/20 hover:bg-white/10"
                            type="button"
                            onClick={changeImage}
                          >
                            Change image
                          </Button>
                        </div>
                      </>
                    ) : (
                      <UploadIcon className="bg-white/20 border border-white/20 size-12 rounded-md p-2" />
                    )}
                  </div>
                  <input {...getInputProps()} accept="image/jpg, image/png" />
                  {isDragActive ? (
                    <p>Drop the file here ...</p>
                  ) : (
                    !imagePreview && (
                      <p className="text-balance text-center">
                        Drag and drop or click to upload
                      </p>
                    )
                  )}
                </div>
              </FormControl>
              <div className="flex items-center gap-2">
                {!form.formState.errors.avatar ? (
                  <p className="text-sm flex items-center gap-2 text-neutral-500">
                    <InfoIcon className="size-4" />
                    Upload your photo (JPG or PNG, max size: 5MB)
                  </p>
                ) : (
                  <FormMessage
                    className="text-orange-500 text-xs"
                    icon={<InfoIcon className="size-3" />}
                  />
                )}
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="data-[error=true]:text-neutral-300">
                Full Name
              </FormLabel>
              <FormControl>
                <Input
                  className="aria-invalid:ring-orange-500/20 aria-invalid:border-orange-500 bg-white/10 placeholder:text-neutral-500"
                  {...field}
                />
              </FormControl>
              <div className="flex items-center gap-2">
                <FormMessage
                  className="text-orange-500 text-xs"
                  icon={<InfoIcon className="size-3" />}
                />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="data-[error=true]:text-neutral-300">
                Email Address
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="example@email.com"
                  className="aria-invalid:ring-orange-500/20 aria-invalid:border-orange-500 bg-white/10 placeholder:text-neutral-500"
                  {...field}
                />
              </FormControl>
              <div className="flex items-center gap-2">
                <FormMessage
                  className="text-orange-500 text-xs"
                  icon={<InfoIcon className="size-3" />}
                />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="githubUsername"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="data-[error=true]:text-neutral-300">
                GitHub Username
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="@yourusername"
                  className="aria-invalid:ring-orange-500/20 aria-invalid:border-orange-500 bg-white/10 placeholder:text-neutral-500"
                  {...field}
                />
              </FormControl>
              <div className="flex items-center gap-2">
                <FormMessage
                  className="text-orange-500 text-xs"
                  icon={<InfoIcon className="size-3" />}
                />
              </div>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-orange-700 text-neutral-900 cursor-pointer hover:bg-orange-500"
        >
          Generate My Ticket
        </Button>
      </form>
    </Form>
  );
};
