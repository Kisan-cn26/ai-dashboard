import { createClient } from "@/lib/supabase/server";

export const Greet = async () => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  return <span>Hey, {data?.claims.email}</span>;
};
