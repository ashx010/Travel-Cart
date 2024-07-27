import { getSession } from 'next-auth/react';

export default function ServerSession(Component) {
  return function WrappedComponent(props) {
    return <Component {...props} />;
  };
}

export async function getServerSidePropsWithSession(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
