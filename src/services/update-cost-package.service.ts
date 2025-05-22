export async function updateCostPackage(
  type: string,
  city: string,
  level: string,
  data: any
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${getEndpointByType(type)}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        city,
        package_level: level,
        ...data,
      }),
    }
  );
  console.log(
    "Sending",
    JSON.stringify({
      city,
      package_level: level,
      ...data,
    })
  );
  
  if (!res.ok) throw new Error("Failed to update package");
}

function getEndpointByType(type: string): string {
  switch (type) {
    case "villa":
      return "villapackage";
    case "c4":
      return "onestoryhousepackage";
    case "ch":
    default:
      return "cityhousepackage";
  }
}
