import { Alert } from "flowbite-react";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      {/* Fixed Alert component */}
      <Alert color="success">
        <span className="font-medium">Success!</span> This is a success alert.
      </Alert>
      
    </div>
  );
}
