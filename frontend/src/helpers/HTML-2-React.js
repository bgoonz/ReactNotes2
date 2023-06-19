const fs = require("fs");

function convertHtmlToReact(fileName) {
  // Read the contents of the HTML file
  const htmlContent = fs.readFileSync(fileName, "utf-8");

  // Convert HTML syntax to ReactJS syntax
  const reactContent = htmlContent
    .replace(/class=/g, "className=")
    .replace(/for=/g, "htmlFor=");

  // Generate the React component name
  const componentName = fileName.replace(".html", "");
  const capitalizedComponentName =
    componentName.charAt(0).toUpperCase() + componentName.slice(1);

  // Generate the React file name
  const reactFileName = fileName.replace(".html", ".jsx");

  // Write the React version of the HTML to a new file
  fs.writeFileSync(
    reactFileName,
    `import React from "react";

const ${capitalizedComponentName} = () => {
  return (
    ${reactContent}
  );
};

export default ${capitalizedComponentName};
`
  );

  console.log(`Successfully converted ${fileName} to ${reactFileName}`);
}

// Provide the HTML file name as an argument when running the program
const fileName = process.argv[2];

if (fileName) {
  convertHtmlToReact(fileName);
} else {
  console.error("Please provide an HTML file name.");
}
