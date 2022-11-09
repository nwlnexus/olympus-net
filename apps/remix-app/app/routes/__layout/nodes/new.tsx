import { type ActionArgs, useActionData } from '~/remix';
import { NewNodeForm } from '~/components/NewNodeForm';

export const action = async ({ request }: ActionArgs) => {
  const data = Object.fromEntries(await request.formData());

  console.log(data);
};

export default function NewNode() {
  const data = useActionData<typeof action>();
  return <NewNodeForm data={data} />;
}
