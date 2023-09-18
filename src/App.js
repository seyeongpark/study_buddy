import React, { useState, useEffect } from 'react';

function App() {
  const defaultLinks = [
    "https://www.cbc.ca/news",
    "https://nationalpost.com/",
    "https://www.ted.com/read/ted-studies",
    "https://www.celpip.ca/"
  ];

  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState('');

  useEffect(() => {
    // Load default links
    setLinks(defaultLinks);
  
    // Load additional links from localStorage
    const storedLinks = JSON.parse(localStorage.getItem('links'));
    if (storedLinks) {
      setLinks(storedLinks);
    }
  }, []);  

  useEffect(() => {
    localStorage.setItem('links', JSON.stringify(links));
  }, [links]);

  const addLink = () => {
    if (newLink) {
      const normalizedLink = normalizeLink(newLink);
      setLinks([...links, normalizedLink]);
      setNewLink('');
    }
  };

  const deleteLink = (index) => {
    const updatedLinks = [...links];
    updatedLinks.splice(index, 1);
    setLinks(updatedLinks);
    localStorage.setItem('links', JSON.stringify(updatedLinks));
  };

  const openMultipleLinks = () => {
    links.forEach(link => {
      window.open(link, "_blank");
    });
  };

  // Function to normalize a link by adding "https://" if it's missing
  const normalizeLink = (link) => {
    if (!link.startsWith("http://") && !link.startsWith("https://")) {
      return "https://" + link;
    }
    return link;
  };

  return (
    <div className="App">
      <div>
        <input
          type="text"
          placeholder="Add a link"
          value={newLink}
          onChange={e => setNewLink(e.target.value)}
        />
        <button onClick={addLink}>Add</button>
      </div>
      <button onClick={openMultipleLinks}>Open Links</button>
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <a href={link} target="_blank">{link}</a>
            <button onClick={() => deleteLink(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
