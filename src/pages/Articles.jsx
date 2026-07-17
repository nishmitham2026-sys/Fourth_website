import React from 'react';

const Articles = () => {
  const articlesList = [
    {
      title: 'The Trend Setters in Carnatic Music',
      url: 'https://www.sruti.com/articles/spotlight/the-trend-setters-in-carnatic-music',
      source: 'Sruti Magazine',
      snippet: 'A deep look into how Purandara Dasa and other founders shaped the structure, notations, and performance layouts of classical Carnatic music.'
    },
    {
      title: 'Purandaradasa | Karnataka, Bhakti Movement, Composer',
      url: 'https://www.britannica.com/topic/Dvaita',
      source: 'Encyclopædia Britannica',
      snippet: 'An overview of Dvaita philosophy and Purandara Dasa\'s critical role in spreading Dvaita tenets to common people through classical devotional songs.'
    },
    {
      title: 'The Hidden Symphony: Unearthing the Depths of Purandara Dasa’s Songs',
      url: 'https://medium.com/@mukund1989/the-hidden-symphony-unearthing-the-depths-of-purandara-dasas-songs-9a72b2f4cbaa',
      source: 'Medium',
      snippet: 'Explores the philosophical depth, subtexts, and melodic underpinnings of the surviving compositions of Saint Purandara Dasa.'
    },
    {
      title: 'Looking for Purandaradasa in Hampi',
      url: 'https://sriramv.com/2018/11/30/9122/',
      source: 'Sriram V Archives',
      snippet: 'Historical journey and exploration of physical monuments and memory sites associated with Purandara Dasa in the ruins of the Vijayanagara Capital, Hampi.'
    },
    {
      title: 'History – Purandara Dasa',
      url: 'https://sfipodcast.com/history-purandara-dasa-ep-238/',
      source: 'SFI Podcast',
      snippet: 'A detailed narrative podcast mapping his early life as Srinivasa Nayaka, the gold merchant, to his transition to a renowned devotional composer.'
    },
    {
      title: 'Purandara Dasa - Wikipedia Profile',
      url: 'https://en.wikipedia.org/wiki/Purandara_Dasa',
      source: 'Wikipedia',
      snippet: 'Comprehensive encyclopedic page summarizing his life history, family tree, contribution to music instruction, and classical literature references.'
    },
    {
      title: 'Sri Purandara Dasa Biography',
      url: 'https://musicinfoguide.blogspot.com/2007/08/sri-purandara-dasa-1494-1564.html',
      source: 'Music Info Guide',
      snippet: 'Overview of the classical lessons of music teaching (such as Svaravalis and Alankaras) formulated by Purandara Dasa.'
    },
    {
      title: 'Dasa Sahitya Compositions',
      url: 'https://dasadas.com/tag/purandara-dasa/',
      source: 'Dasa Das',
      snippet: 'A library collection of lyrics translations and commentary on Haridasa Keertanas and philosophical thoughts.'
    },
    {
      title: 'Trendsetters in Carnatic Music Development',
      url: 'https://www.carnaticcorner.com/articles/trendsetters.html',
      source: 'Carnatic Corner',
      snippet: 'Chronicles the historical shifts in Carnatic music systems and how Mayamalavagowla became the standard scale for beginners.'
    },
    {
      title: 'Kshetras Visited by Purandaradasa',
      url: 'https://sriramv.com/2019/01/21/kshetras-visited-by-purandaradasa/',
      source: 'Historical Archives',
      snippet: 'A geographical map study tracing the pilgrimage temples visited by Purandara Dasa throughout southern India.'
    },
    {
      title: 'Contribution of Saint Purandaradasa in Carnatic Music',
      url: 'https://www.acharyanet.com/contribution-of-saint-purandaradasa-in-the-progress-of-carnatic-music/',
      source: 'Acharyanet',
      snippet: 'Analyzing the pedagogical graded lessons, gitas, and suladis introduced to simplify music theory.'
    },
    {
      title: 'Purandaradasa Keerthanas Archive Books',
      url: 'https://archive.org/details/dli.ministry.24270/page/n13/mode/2up',
      source: 'Internet Archive',
      snippet: 'Digital scan copy of ancient publications containing notations and transcripts of Dasa Sahitya.'
    }
  ];

  return (
    <div className="fade-in-element">
      <header className="page-header">
        <div className="container">
          <h1 className="font-serif">Scientific &amp; Historical Articles</h1>
          <p className="text-white-50">Read essays, research papers, and studies on Purandara Dasa's musical genius</p>
          <div className="underline-gold"></div>
        </div>
      </header>

      <section className="section-padding bg-dark" style={{ backgroundColor: 'var(--primary-bg)' }}>
        <div className="container">
          <div className="row g-4">
            {articlesList.map((article, idx) => (
              <div key={idx} className="col-md-6">
                <div 
                  className="card-custom p-4 h-100 d-flex flex-column justify-content-between"
                  style={{ backgroundColor: 'var(--secondary-bg)' }}
                >
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="badge rounded-pill bg-warning text-dark font-serif fw-bold px-3 py-1.5" style={{ backgroundColor: 'var(--accent-gold)' }}>
                        {article.source}
                      </span>
                      <span className="text-white-50 small"># {idx + 1}</span>
                    </div>
                    
                    <h4 className="font-serif fs-5 text-white mb-3 hover-gold" style={{ transition: 'color 0.2s' }}>
                      {article.title}
                    </h4>
                    
                    <p className="text-white-50 small mb-4">
                      {article.snippet}
                    </p>
                  </div>
                  
                  <div>
                    <a 
                      href={article.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn-gold btn-sm rounded-pill w-100"
                    >
                      Read Article <i className="bi bi-box-arrow-up-right ms-1"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Articles;
