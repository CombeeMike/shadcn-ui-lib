import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './form.js';
import React from 'react';
import type { ControllerProps, ControllerRenderProps, FieldPath, FieldValues, useForm } from 'react-hook-form';

/**
 * Wrapper around shadcns `FormField` which provides a label and a message for the field and simplifies the overall
 * usage.
 *
 * The given `children` is the input component which will be rendered inside the `FormField` and which will be passed
 * the following form field properties which are used to "auto connect" to the given `form`:\
 * `value`, `onChange`, `onBlur`, `disabled`, `name`.
 *
 * This means, the given `children` should be a component which accepts & uses these props for the form field to work
 * properly.
 */
export const SimpleFormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  form,
  name,
  label,
  children,
  ...props
}: Omit<ControllerProps<TFieldValues, TName>, 'render'> & {
  label: string;
  form: ReturnType<typeof useForm<TFieldValues>>;
  children: React.ReactElement<ControllerRenderProps<TFieldValues, TName>>;
}): React.JSX.Element => {
  return (
    <FormField
      {...props}
      control={form.control}
      name={name}
      render={({ field }) => {
        // Not all components which we're using with the `SimpleFormField` accept a `ref` prop ATM (e.g. `TagsSelect`).
        // I'm not sure if this is the best way to handle this, but I have not experienced any issues which could be
        // caused by not passing the `ref`...
        const { ref, ...fieldWithoutRef } = field;
        const renderEl = React.cloneElement(children, fieldWithoutRef);

        return (
          <FormItem>
            <div className="flex flex-col gap-2">
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <div>
                  {renderEl}
                  <FormMessage />
                </div>
              </FormControl>
            </div>
          </FormItem>
        );
      }}
    />
  );
};
