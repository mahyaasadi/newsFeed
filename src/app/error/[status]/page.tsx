"use client";
// next
import { useRouter, usePathname } from "next/navigation";
// styles
import styles from "src/app/error/[status]/error.module.scss";

export default function ErrorPage() {
  const router = useRouter();
  const pathname = usePathname();

  const status = pathname.split("/").pop();
  let message = "An error occurred.";

  if (status === "404") {
    message = "Page not found.";
  } else if (status === "401") {
    message = "Unauthorized";
  } else if (status === "500") {
    message = "Internal server error.";
  }

  return (
    <div className={styles.error_page}>
      <h1>Error {status}</h1>
      <p>{message}</p>
      <button onClick={() => router.back()} className={styles.back_button}>
        Go Back
      </button>
    </div>
  );
}
