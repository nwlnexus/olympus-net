import { ValidatedForm } from 'remix-validated-form';
import { Input } from 'react-daisyui';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { withZod } from '@remix-validated-form/with-zod';

const schema = z.object({
  name: zfd.text(),
  fqdn: zfd.text()
});

const clientValidator = withZod(schema);

type NewNodeFormProps = {
  data?: any;
};

export function NewNodeForm({ data }: NewNodeFormProps) {
  return (
    <ValidatedForm
      action='/nodes/new'
      method='post'
      validator={clientValidator}
      className='flex w-full items-center justify-center gap-2 p-4 font-sans'
    >
      <div className='space-y-8 divide-y font-sans'>
        <div className='pt-8'>
          <div className='sm:grid-col-6 mt-6 grid grid-cols-1 gap-y-6 gap-x-4'>
            <div className='sm:col-span-6'>
              <label htmlFor='server-name' className='block text-sm font-medium'>
                Server name
              </label>
              <div>
                <Input id='server-name' type='text' name='server-name' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ValidatedForm>
  );
}
