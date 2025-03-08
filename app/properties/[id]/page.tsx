export async function generateStaticParams() {
  // You can fetch the list of property IDs from your API or database
  // For now, we'll return an empty array which will be populated at build time
  // or you can hardcode some IDs for testing
  return []
  
  // Example with actual IDs:
  // const properties = await fetch('https://your-api/properties').then(res => res.json())
  // return properties.map(property => ({
  //   id: property.id.toString()
  // }))
} 