"use client";

import { useSession } from "next-auth/react";
function page() {
  const { data: session } = useSession();
  console.log(session?.user);
  return (
    <div>
      hello
    </div>
  )
}

export default page
