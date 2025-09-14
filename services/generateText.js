// Replace {{child_name}} in each story page
const generateText = async (story, child_name) => {
  // Example: split story into pages by '\n\n'
  const pages = story.split('\n\n');
  const personalizedPages = pages.map(page => page.replace(/{{child_name}}/g, child_name));
  return personalizedPages; // array of text pages
};

module.exports = generateText;
