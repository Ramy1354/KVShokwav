import { useState } from 'react';
import './EmbedCreator.css';

function EmbedCreator() {
  const [embed, setEmbed] = useState({
    title: '',
    description: '',
    color: '#FF0000',
    author: '',
    footer: '',
    thumbnail: '',
    image: '',
    fields: [],
  });

  const handleChange = (field, value) => {
    setEmbed(prev => ({ ...prev, [field]: value }));
  };

  const addField = () => {
    setEmbed(prev => ({
      ...prev,
      fields: [...prev.fields, { name: '', value: '', inline: false }],
    }));
  };

  const updateField = (index, field, value) => {
    const newFields = [...embed.fields];
    newFields[index][field] = value;
    setEmbed(prev => ({ ...prev, fields: newFields }));
  };

  const removeField = (index) => {
    setEmbed(prev => ({
      ...prev,
      fields: prev.fields.filter((_, i) => i !== index),
    }));
  };

  const exportJSON = () => {
    const embedData = {
      title: embed.title || undefined,
      description: embed.description || undefined,
      color: parseInt(embed.color.replace('#', ''), 16),
      author: embed.author ? { name: embed.author } : undefined,
      footer: embed.footer ? { text: embed.footer } : undefined,
      thumbnail: embed.thumbnail ? { url: embed.thumbnail } : undefined,
      image: embed.image ? { url: embed.image } : undefined,
      fields: embed.fields.length > 0 ? embed.fields : undefined,
    };

    const cleanEmbed = Object.fromEntries(
      Object.entries(embedData).filter(([_, v]) => v !== undefined)
    );

    const jsonString = JSON.stringify(cleanEmbed, null, 2);
    navigator.clipboard.writeText(jsonString);
    alert('Embed JSON copied to clipboard!');
  };

  return (
    <div className="embed-creator">
      <div className="embed-creator-container">
        <h1 className="embed-creator-title gradient-text">Embed Creator</h1>
        <p className="embed-creator-subtitle">Design custom Discord embeds</p>

        <div className="embed-creator-content">
          <div className="embed-editor">
            <div className="editor-section card">
              <h3 className="editor-heading">Basic Info</h3>

              <div className="input-group">
                <label className="input-label">Title</label>
                <input
                  type="text"
                  className="input-field"
                  value={embed.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="Embed title"
                />
              </div>

              <div className="input-group">
                <label className="input-label">Description</label>
                <textarea
                  className="input-field textarea"
                  value={embed.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Embed description"
                  rows="4"
                />
              </div>

              <div className="input-group">
                <label className="input-label">Color</label>
                <div className="color-input-group">
                  <input
                    type="color"
                    className="color-picker"
                    value={embed.color}
                    onChange={(e) => handleChange('color', e.target.value)}
                  />
                  <input
                    type="text"
                    className="input-field color-text"
                    value={embed.color}
                    onChange={(e) => handleChange('color', e.target.value)}
                    placeholder="#FF0000"
                  />
                </div>
              </div>
            </div>

            <div className="editor-section card">
              <h3 className="editor-heading">Additional Info</h3>

              <div className="input-group">
                <label className="input-label">Author</label>
                <input
                  type="text"
                  className="input-field"
                  value={embed.author}
                  onChange={(e) => handleChange('author', e.target.value)}
                  placeholder="Author name"
                />
              </div>

              <div className="input-group">
                <label className="input-label">Footer</label>
                <input
                  type="text"
                  className="input-field"
                  value={embed.footer}
                  onChange={(e) => handleChange('footer', e.target.value)}
                  placeholder="Footer text"
                />
              </div>

              <div className="input-group">
                <label className="input-label">Thumbnail URL</label>
                <input
                  type="text"
                  className="input-field"
                  value={embed.thumbnail}
                  onChange={(e) => handleChange('thumbnail', e.target.value)}
                  placeholder="https://example.com/image.png"
                />
              </div>

              <div className="input-group">
                <label className="input-label">Image URL</label>
                <input
                  type="text"
                  className="input-field"
                  value={embed.image}
                  onChange={(e) => handleChange('image', e.target.value)}
                  placeholder="https://example.com/image.png"
                />
              </div>
            </div>

            <div className="editor-section card">
              <div className="fields-header">
                <h3 className="editor-heading">Fields</h3>
                <button className="btn-secondary add-field-btn" onClick={addField}>
                  + Add Field
                </button>
              </div>

              {embed.fields.map((field, index) => (
                <div key={index} className="field-item">
                  <div className="field-inputs">
                    <input
                      type="text"
                      className="input-field"
                      value={field.name}
                      onChange={(e) => updateField(index, 'name', e.target.value)}
                      placeholder="Field name"
                    />
                    <input
                      type="text"
                      className="input-field"
                      value={field.value}
                      onChange={(e) => updateField(index, 'value', e.target.value)}
                      placeholder="Field value"
                    />
                    <label className="inline-checkbox">
                      <input
                        type="checkbox"
                        checked={field.inline}
                        onChange={(e) => updateField(index, 'inline', e.target.checked)}
                      />
                      <span>Inline</span>
                    </label>
                  </div>
                  <button
                    className="remove-field-btn"
                    onClick={() => removeField(index)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <button className="btn-primary export-btn" onClick={exportJSON}>
              Copy JSON to Clipboard
            </button>
          </div>

          <div className="embed-preview">
            <h3 className="preview-heading">Preview</h3>
            <div className="discord-embed-container">
              <div
                className="discord-embed"
                style={{ borderLeftColor: embed.color }}
              >
                {embed.author && (
                  <div className="embed-author">{embed.author}</div>
                )}
                {embed.title && (
                  <div className="embed-title">{embed.title}</div>
                )}
                {embed.description && (
                  <div className="embed-description">{embed.description}</div>
                )}
                {embed.fields.length > 0 && (
                  <div className="embed-fields">
                    {embed.fields.map((field, index) => (
                      <div
                        key={index}
                        className={`embed-field ${field.inline ? 'inline' : ''}`}
                      >
                        <div className="field-name">{field.name || 'Field Name'}</div>
                        <div className="field-value">{field.value || 'Field Value'}</div>
                      </div>
                    ))}
                  </div>
                )}
                {embed.image && (
                  <img src={embed.image} alt="Embed" className="embed-image" />
                )}
                {embed.footer && (
                  <div className="embed-footer">{embed.footer}</div>
                )}
                {embed.thumbnail && (
                  <img src={embed.thumbnail} alt="Thumbnail" className="embed-thumbnail" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmbedCreator;
