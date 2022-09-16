import { generateConfigs } from '~/utils/auth-config.server';
import { getAuthenticator } from '~/core/services/auth/auth.server';
import { redirect, useLoaderData } from '~/remix';
import type { LoaderArgs } from '~/remix';
import { NodeEmpty } from '~/components';
import { Modal } from 'react-daisyui';
import { useState } from 'react';

export const loader = async ({ request, context }: LoaderArgs) => {
  const { authConfig, sessionConfig } = generateConfigs(context);
  const authenticator = await getAuthenticator(authConfig, sessionConfig);
  const user = await authenticator.isAuthenticated(request);
  const { pathname } = new URL(request.url);

  // TODO: Correct this to block access to all other pages but main page and about
  if (pathname !== '/' && !user) {
    return redirect('/auth/login');
  }

  return null;
};

export default function Nodes() {
  const nodes = useLoaderData<typeof loader>();
  const [showNewNodeMdl, setShowNewNodeMdl] = useState(false);

  const toggleNewNodeMdl = () => {
    setShowNewNodeMdl(!showNewNodeMdl);
  };

  if (nodes) {
    return (
      <>
        <h1>Nodes</h1>
      </>
    );
  }
  return (
    <>
      <NodeEmpty toggle={toggleNewNodeMdl} />
      <Modal open={showNewNodeMdl} onClickBackdrop={toggleNewNodeMdl} className='w-11/12 max-w-5xl'>
        <Modal.Header>New Node</Modal.Header>
      </Modal>
    </>
  );
}
