import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'
import { GetServerSidePropsContext, GetStaticPathsContext } from 'next'

export default function Profile({ user }: { user: any }) {
  return <div>Hello {user.name}</div>
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createPagesServerClient(ctx)
  const {
    data: { session },
  } = await supabase.auth.getSession()
  console.log(session)

  if (!session)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  }
}
