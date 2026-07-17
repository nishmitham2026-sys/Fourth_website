import React, { useState } from 'react';

const History = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fade-in-element">
      <header className="page-header">
        <div className="container">
          <h1 className="font-serif">Life History</h1>
          <p className="text-white-50">The journey of a wealthy merchant who became the grandfather of Carnatic music</p>
          <div className="underline-gold"></div>
        </div>
      </header>

      <section className="section-padding bg-dark" style={{ backgroundColor: 'var(--primary-bg)' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div 
                className="card-custom p-4 p-md-5 mb-5 text-justify"
                style={{ 
                  backgroundColor: 'var(--secondary-bg)',
                  border: '1px solid var(--border-color)',
                  lineHeight: '1.9',
                  textAlign: 'justify'
                }}
              >
                <div className="d-flex align-items-center mb-4">
                  <div className="bg-gold-light p-2 rounded-3 me-3" style={{ background: 'rgba(212, 175, 55, 0.08)', border: '1px solid rgba(212, 175, 55, 0.25)' }}>
                    <i className="bi bi-book-half text-gold fs-3" style={{ color: 'var(--accent-gold)' }}></i>
                  </div>
                  <h3 className="font-serif mb-0">Biographical Narrative</h3>
                </div>

                <p className="fs-5 mb-4">
                  Sri Purandara Dasa was a renowned composer, singer, and a Haridasa philosopher from present-day Karnataka, India. 
                  A devoted follower of Madhvacharya's Dvaita philosophy, he is widely celebrated as one of the chief architects of 
                  Karnatak (Carnatic) music. Due to his pivotal contributions, he is often called the Pitamaha (grandfather) of Karnatak music. 
                  According to legend, he is believed to be the incarnation of the sage Narada.
                </p>
                
                <p className="fs-5 mb-4">
                  Purandara Dasa was a wealthy merchant of gold, silver and other miscellaneous jewellery from Karnataka, who gave away all 
                  his material riches to become a Haridasa, a devotional singer who made the difficult Sanskrit tenets of Bhagavata Purana 
                  available to everyone in simple and melodious songs. He was one of the most important music scholars of medieval India. 
                  He formulated the basic lessons of teaching Carnatic music by structuring graded exercises known as Svaravalis and Alankaras, 
                  and at the same time, he introduced the raga Mayamalavagowla as the first scale to be learnt by beginners in the field &ndash; 
                  a practice that is still followed today. He also composed Gitas for novice students. Purandara Dasa is noted for composing 
                  Dasa Sahithya, as a Bhakti movement vocalist, and a music scholar. His younger contemporary, Kanakadasa, emulated his practice.
                </p>

                <p className="fs-5 mb-4">
                  Purandara Dasa was born to a diamond merchant in a Kannada Deshastha family, in 1484 CE in Araga, Vijayanagara Empire 
                  (Modern Day Thirthahalli), Karnataka. 
                  {!isExpanded && <span className="text-gold fw-bold ms-1" style={{ color: 'var(--accent-gold)' }}>...</span>}
                </p>

                {isExpanded && (
                  <div className="more-text-container">
                    <p className="fs-5 mb-4">
                      Purandara Dasa was the only son of the wealthy merchant Varadappa Nayaka and his wife Rukmini. He was named 
                      Srinivasa Nayaka, after the patron deity of Venkateswara Temple, Tirumala. He acquired proficiency in Kannada, 
                      Sanskrit, and sacred music through education. At the age of 16, he was married to Saraswati Bai, traditionally 
                      described as a pious young girl. They had four sons: Varadappa, Gururaya, Abhinavappa, and Madhvapati. 
                      He lost his parents at age 20, thereby inheriting his father's business of gemstones and pawning. He prospered 
                      and became known as Navakoti Narayana (an abundantly rich man; worth ninety million).
                    </p>

                    <p className="fs-5 mb-4">
                      Popular legend narrates a miraculous incident in Srinivasa Nayaka's life, owing to which he was led to devote himself 
                      to the practice, propagation and inculcation of bhakti (devotion) towards Krishna through musical compositions. 
                      As a natural, inescapable consequence of such a transforming event, ubiquitous in the lives of several saints throughout 
                      the ages, he is believed to have relinquished his former greedy and miserly self, having realized the worthlessness of 
                      attachment to worldly possessions.
                    </p>
                    
                    <p className="fs-5 mb-4">
                      The deity, in a bid to cure Srinivaasa of his tenacious materialistic delusion and attachment, and thereby claim his 
                      devotion to himself, approached Srinivaasa in the guise of a poor man, with a piteous plea for money; ostensibly, the money 
                      was needed to perform His son's 'upanayana' (sacred-thread investiture ceremony). Having been summarily rejected, mocked 
                      and turned out, the 'poor man' repeated his plea before Srinivaasa's wife; a generous soul of rigorous spiritual nature, 
                      she gave away one of her precious nose rings, unbeknownst to her husband. The 'poor man' sold the nose ring back to none 
                      other than Srinivasa himself! The shrewd Srinivasa, privy to his wife's openhandedness, immediately identified the nose ring 
                      as his wife's and hurried home. Enraged and anxious to ascertain the truth of the matter, he demanded his wife to produce 
                      the nose ring before him immediately.
                    </p>

                    <p className="fs-5 mb-4">
                      Realizing that Srinivaasa had grown wise to her secret donation, the wife decided to end her life with poison. Having 
                      completed her prayers to Vishnu before her attempt, she was shocked to see a nose ring inside the poison cup &ndash; 
                      completely identical to the one she had just given away. Incredulous and rapturous, she recounted the entire episode to 
                      her husband, who was bewildered and lost. Meanwhile, a search for the 'poor man' was of no avail; he had as mysteriously 
                      vanished as he had appeared! At that very propitious moment, Srinivaasa's old self &ndash; convinced of the inscrutable 
                      ways of Vishnu, having witnessed the unfailing grace that saved his pious wife, bewildered at the power that could, in a 
                      moment, produce a gold ornament by mere will &ndash; instantly shook off that beginning-less, persistent veil in the form 
                      of 'I' and 'mine'.
                    </p>

                    <p className="fs-5 mb-4">
                      Being unable to do it in his present life, he requested his younger son to complete them. His son Madhwapathi told his 
                      father that he could do this in his next janma (birth). It is believed that he was reborn as the famous Vijayadasa &ndash; 
                      birthplace is Cheekalparvi village near Maanvi town, Raichur district in Karnataka State &ndash; and completed the remaining 
                      25 thousand keerthanas as promised. Most of his songs are in praise of Vishnu and other deities. Due to this, he is believed 
                      to be an avatar of Narada, the celestial singer and son of goddess Saraswati. One of the Trimurtis (three icons) of Karnatak 
                      music, Saint Tyagaraja, has paid tribute to Purandara Dasa in his geya natakam (an opera) Prahlada Bhakti Vijayam.
                    </p>
                  </div>
                )}

                <div className="text-center mt-5">
                  <button 
                    id="myBtn" 
                    className="btn btn-gold px-5 py-2.5 rounded-pill shadow-sm"
                    onClick={() => setIsExpanded(!isExpanded)}
                    style={{ transition: 'all 0.3s ease' }}
                  >
                    {isExpanded ? 'Read Less' : 'Read More'}
                  </button>
                </div>

                <div className="text-center text-white-50 small mt-4 pt-3 border-top" style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}>
                  This information is sourced from Wikipedia.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default History;
