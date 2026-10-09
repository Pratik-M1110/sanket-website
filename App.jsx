import { useState, useEffect } from 'react';
import { routePath } from './routes.js';
import { services } from './services.js';

const publicPhone = '+91 88881 87545';
const publicPhoneDisplay = '88881 87545';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="announcement-bar">
        <span>📍 Chhatrapati Sambhajinagar (Aurangabad), Maharashtra</span>
        <div className="top-contacts">
          <a href={`tel:${publicPhone.replace(/[^+\d]/g, '')}`}>📞 +91 {publicPhoneDisplay}</a>
          <span className="separator">|</span>
          <a href="https://wa.me/918888187545" target="_blank" rel="noopener">💬 WhatsApp</a>
        </div>
      </div>
      <header className={`main-nav ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="logo-area">
            <span className="logo-icon">⚖️</span>
            <div className="logo-text">
              <span className="logo-name">Sanket Palnitkar</span>
              <span className="logo-title">Advocate & Legal Consultant</span>
            </div>
          </div>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#practice">Practice Areas</a>
            <a href="#process">The Process</a>
            <a href="#contact" className="nav-cta">Consultation</a>
          </div>
        </div>
      </header>
    </>
  );
}

function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-badge">Bombay High Court Bench at Aurangabad</div>
        <h1>Advocate Sanket Palnitkar</h1>
        <p className="hero-subtitle">Providing Result-Oriented Legal Solutions for Complex Litigation in Marathwada.</p>
        <div className="hero-specialties">
          <span>Criminal Defense</span> • <span>High Court Writs</span> • <span>Civil Matters</span> • <span>Family Law</span>
        </div>
        <div className="hero-actions">
          <a href={`tel:${publicPhone.replace(/[^+\d]/g, '')}`} className="cta-button">Call +91 {publicPhoneDisplay}</a>
          <a href="#practice" className="cta-button secondary">Explore Expertise</a>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="section-container">
        <div className="about-grid">
          <div className="about-image-container">
             <div className="legal-frame">
               <img src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80" alt="Legal Gavel and Books" />
               <div className="experience-badge">
                 <span className="number">12+</span>
                 <span className="text">Years of Excellence</span>
               </div>
             </div>
          </div>
          <div className="about-text">
            <h4 className="section-subtitle">Dedicated Advocacy</h4>
            <h2 className="section-title">About Advocate Sanket Palnitkar</h2>
            <p>Advocate Sanket Palnitkar is a distinguished legal practitioner based in <strong>Chhatrapati Sambhajinagar (Aurangabad)</strong>, specializing in aggressive courtroom litigation and strategic legal advisory. With a robust practice at the <strong>Bombay High Court Bench at Aurangabad</strong> and District & Sessions Courts, he is known for his meticulous approach to complex legal challenges.</p>
            <p>His philosophy centers on "Litigation-First" — ensuring that every case is built on a foundation of unshakeable facts and a strategic understanding of the judicial forum. Whether defending criminal charges or navigating intricate property disputes, his goal is to deliver justice with integrity and precision.</p>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-num">850+</span>
                <span className="stat-label">Cases Represented</span>
              </div>
              <div className="stat-item">
                <span className="stat-num">100%</span>
                <span className="stat-label">Confidentiality</span>
              </div>
              <div className="stat-item">
                <span className="stat-num">24/7</span>
                <span className="stat-label">Emergency Bail Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PracticeAreas() {
  const areas = [
    { title: "Criminal Defense", desc: "Expertise in Trials, Anticipatory Bail (438 CrPC), Regular Bail, and FIR Quashing (482 CrPC).", icon: "⚖️" },
    { title: "High Court Writs", desc: "Specializing in Writ Petitions (Articles 226 & 227) and Civil/Criminal Appeals at the Aurangabad Bench.", icon: "🏛️" },
    { title: "Civil & Property", desc: "Title Verification, Partition Suits, Injunctions, and RERA disputes with a focus on protecting assets.", icon: "🏠" },
    { title: "Matrimonial Law", desc: "Sensitive handling of Divorce, 498A Defense, Child Custody, and Maintenance litigation.", icon: "🤝" },
    { title: "Cheque Bounce", desc: "Aggressive prosecution and defense in Section 138 Negotiable Instruments Act cases.", icon: "📄" },
    { title: "Revenue Laws", desc: "Expertise in 7/12 corrections, mutation challenges, and revenue appeals in Maharashtra.", icon: "🚜" }
  ];

  return (
    <section id="practice" className="practice-section">
      <div className="section-container">
        <div className="center-header">
          <h4 className="section-subtitle">Areas of Expertise</h4>
          <h2 className="section-title">Professional Legal Services</h2>
        </div>
        <div className="practice-grid-detailed">
          {areas.map((area, index) => (
            <div key={index} className="practice-card-new">
              <span className="card-icon">{area.icon}</span>
              <h3>{area.title}</h3>
              <p>{area.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const steps = [
    { title: "Consultation", desc: "In-depth discussion to understand the facts and legal nuances of your matter." },
    { title: "Strategy", desc: "Drafting a roadmap tailored to the specific court or tribunal requirements." },
    { title: "Drafting", desc: "Precise legal drafting and evidence gathering for strong representation." },
    { title: "Advocacy", desc: "Determined arguments in court to secure the best possible outcome for the client." }
  ];

  return (
    <section id="process" className="process-section">
      <div className="section-container">
        <div className="center-header">
          <h2 className="section-title" style={{ color: 'var(--gold)' }}>The Litigation Process</h2>
          <p style={{ color: '#cbd5e1' }}>A transparent, step-by-step approach to achieving your legal objectives.</p>
        </div>
        <div className="process-flow">
          {steps.map((step, index) => (
            <div key={index} className="process-step">
              <div className="step-number">{index + 1}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="contact-section">
      <div className="section-container">
        <div className="contact-card">
          <div className="contact-info">
            <h2>Start Your Consultation</h2>
            <p>Connect with Advocate Sanket Palnitkar for immediate legal assistance and strategic advice.</p>
            <div className="info-items">
              <div className="info-item">
                <span className="icon">📞</span>
                <div>
                  <label>Call Directly</label>
                  <a href={`tel:${publicPhone.replace(/[^+\d]/g, '')}`}>+91 {publicPhoneDisplay}</a>
                </div>
              </div>
              <div className="info-item">
                <span className="icon">💬</span>
                <div>
                  <label>WhatsApp</label>
                  <a href="https://wa.me/918888187545">Message Now</a>
                </div>
              </div>
              <div className="info-item">
                <span className="icon">📍</span>
                <div>
                  <label>Office Location</label>
                  <span>Chhatrapati Sambhajinagar (Aurangabad), Maharashtra</span>
                </div>
              </div>
            </div>
          </div>
          <div className="contact-action">
             <div className="emergency-box">
               <h3>Emergency?</h3>
               <p>For urgent matters like police custody, anticipatory bail, or court injunctions, call the emergency number immediately.</p>
               <a href={`tel:${publicPhone.replace(/[^+\d]/g, '')}`} className="cta-button">Call Now</a>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const firmPhone = '+91 88881 87545';
const firmPhoneHref = 'tel:+918888187545';
const firmWhatsAppBase = 'https://wa.me/918888187545';
const firmWhatsApp = `${firmWhatsAppBase}?text=${encodeURIComponent('नमस्कार, मला कायदेविषयक सल्ल्यासाठी संपर्क करायचा आहे.')}`;
const leadEndpoint = import.meta.env?.VITE_LEAD_ENDPOINT;

const matterByArea = {
  'sec-hc': 'High Court / Writ',
  'sec-civil': 'Civil / Property',
  'sec-family': 'Family / Matrimonial',
  'sec-criminal': 'Criminal',
  'sec-labour': 'Labour / Service / MAT',
  'sec-consumer': 'Consumer / Notice',
};

function trackEvent(name, params = {}) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...params });
}

function leadSource() {
  const params = new URLSearchParams(window.location.search);
  const campaign = params.get('utm_source');
  if (campaign) return [campaign, params.get('utm_medium'), params.get('utm_campaign')].filter(Boolean).join(' / ');
  try {
    return document.referrer ? new URL(document.referrer).hostname : 'direct';
  } catch {
    return 'direct';
  }
}

const practiceAreasContent = [
  {
    id: 'sec-hc', number: '01', title: 'High Court Matters & Constitutional Remedies',
    description: 'Particular strength in High Court litigation and writ jurisdiction, seeking constitutional remedies and appellate relief.',
    points: ['Writ petitions before the Bombay High Court', 'Constitutional remedies under Articles 226 & 227', 'Appeals, revisions and other appellate proceedings'],
    mrTitle: 'उच्च न्यायालयीन प्रकरणे व घटनात्मक उपाय',
    mrDescription: 'घटनात्मक उपाय आणि अपीलीय दिलासा मिळविण्यासाठी उच्च न्यायालयीन खटले व रिट अधिकारक्षेत्रावर विशेष भर.',
    mrPoints: ['मुंबई उच्च न्यायालयात रिट याचिका', 'अनुच्छेद 226 व 227 अंतर्गत घटनात्मक उपाय', 'अपिले, पुनरीक्षण व इतर अपीलीय कार्यवाही'],
  },
  {
    id: 'sec-civil', number: '02', title: 'Civil Litigation & Property Disputes',
    description: 'Suits and disputes concerning property, contracts, money recovery, partition, injunctions and specific performance, from filing through decree and execution.',
    points: ['Property and title disputes, partition suits', 'Recovery of money and contractual disputes', 'Injunctions, specific performance and declaratory suits'],
    mrTitle: 'दिवाणी खटले व मालमत्ता वाद',
    mrDescription: 'मालमत्ता, करार, पैशांची वसुली, वाटणी, मनाई आदेश आणि कराराची विशिष्ट अंमलबजावणी यासंबंधीचे दावे व वाद.',
    mrPoints: ['मालमत्ता व हक्कविषयक वाद, वाटणीचे दावे', 'पैशांची वसुली व करारविषयक वाद', 'मनाई आदेश, विशिष्ट अंमलबजावणी व घोषणात्मक दावे'],
  },
  {
    id: 'sec-family', number: '03', title: 'Family & Matrimonial Matters',
    description: 'Matrimonial and family disputes handled with discretion, from the first consultation to settlement or decree.',
    points: ['Divorce and judicial separation', 'Domestic violence and maintenance proceedings', 'Child custody and guardianship matters'],
    mrTitle: 'कौटुंबिक व वैवाहिक प्रकरणे',
    mrDescription: 'पहिल्या सल्लामसलतीपासून समझोता किंवा न्यायालयीन निर्णयापर्यंत वैवाहिक व कौटुंबिक वाद गोपनीयतेने हाताळले जातात.',
    mrPoints: ['घटस्फोट व न्यायालयीन विभक्तता', 'घरगुती हिंसाचार व पोटगीची कार्यवाही', 'बालसंगोपन व पालकत्वविषयक प्रकरणे'],
  },
  {
    id: 'sec-criminal', number: '04', title: 'Criminal Litigation',
    description: 'Defence and complaint representation before the Sessions Court and Magistrate Courts, including bail, trial and appeal.',
    points: ['Anticipatory and regular bail applications', 'FIR quashing, trial defence and cross-examination', 'Cheque bounce cases under the Negotiable Instruments Act'],
    mrTitle: 'फौजदारी खटले',
    mrDescription: 'जामीन, खटला व अपील यांसह सत्र न्यायालय आणि दंडाधिकारी न्यायालयांत बचाव व तक्रार प्रकरणांचे प्रतिनिधित्व.',
    mrPoints: ['अटकपूर्व व नियमित जामीन अर्ज', 'FIR रद्द करणे, खटल्यातील बचाव व उलटतपासणी', 'परक्राम्य लिखत अधिनियमांतर्गत धनादेश अनादर प्रकरणे'],
  },
  {
    id: 'sec-labour', number: '05', title: 'Labour, Service & MAT Matters',
    description: 'Representation for government and private-sector employees, including teachers and educational staff, in disputes with their employer or department.',
    points: ['Departmental inquiries and disciplinary proceedings', 'Promotion, seniority, pension and pay disputes', 'Maharashtra Administrative Tribunal (MAT) and teacher & educational service disputes'],
    mrTitle: 'कामगार, सेवा व MAT प्रकरणे',
    mrDescription: 'नियोक्ता किंवा विभागाशी असलेल्या वादांत सरकारी व खासगी क्षेत्रातील कर्मचारी, शिक्षक आणि शैक्षणिक कर्मचाऱ्यांचे प्रतिनिधित्व.',
    mrPoints: ['विभागीय चौकशी व शिस्तभंगविषयक कार्यवाही', 'पदोन्नती, ज्येष्ठता, निवृत्तिवेतन व वेतनविषयक वाद', 'महाराष्ट्र प्रशासकीय न्यायाधिकरण (MAT) व शिक्षक सेवा प्रकरणे'],
  },
  {
    id: 'sec-consumer', number: '06', title: 'Consumer Matters & Legal Documentation',
    description: 'Consumer rights, legal notices and documentation.',
    points: ['Consumer complaints before the District Commission', 'Legal notices, replies and drafting of agreements', 'General legal advisory and documentation'],
    mrTitle: 'ग्राहक प्रकरणे व कायदेशीर दस्तऐवज',
    mrDescription: 'ग्राहक हक्क, कायदेशीर नोटिसा आणि दस्तऐवजीकरण.',
    mrPoints: ['जिल्हा आयोगासमोरील ग्राहक तक्रारी', 'कायदेशीर नोटिसा, उत्तरे व करारांचा मसुदा', 'सामान्य कायदेशीर सल्ला व दस्तऐवजीकरण'],
  },
];

const testimonials = [
  {
    quote: 'I am being represented by Adv. Sanket in a family matter. What stands out is the proactive approach — the file is watched between dates, and I am kept informed of each development. Even while the case is pending, the advice has been clear and practical. It is a relief to work with an advocate who treats the details with care.',
    client: 'Client · Family matter (ongoing)',
  },
  {
    quote: 'श्री. संकेत सर हे मी भेटलेल्यांपैकी सर्वोत्तम वकील आहेत. मला CAVEAT दाखल करायचे होते, आणि एकदम सोप्या भाषेत समजावलं. पक्षकार खूप गोंधळलेला असतो, मी त्यांच्याशी बोलल्यानंतर खूप समाधानी झालो. एकदम थोड्या वेळात प्रक्रिया पूर्ण केली.',
    client: 'Client · Caveat filing',
  },
  {
    quote: 'Adv. Sanket explained the matrimonial process plainly and handled the paperwork and court appearance with care. Helpful, well prepared, and easy to reach. I would recommend speaking with him if you need guidance in a divorce or family matter.',
    client: 'Client · Matrimonial matter',
  },
  {
    quote: 'I recently worked with Advocate Sanket Palnitkar regarding some complex property matters, and I could not be more impressed with his service. From our very first consultation, he demonstrated an exceptional depth of knowledge, meticulous attention to detail, and a clear, pragmatic approach to resolving legal issues.',
    client: 'Client · Land dispute',
  },
];

const workSteps = [
  { numeral: 'I', title: 'Consultation', description: 'Discuss the facts, documents and objective in a meeting or call.', mrTitle: 'सल्लामसलत', mrDescription: 'बैठक किंवा फोनवर प्रकरणाची तथ्ये, कागदपत्रे आणि उद्दिष्ट यांवर चर्चा.' },
  { numeral: 'II', title: 'Case Assessment', description: 'Review of records and applicable law, with an honest view of course and timeline.', mrTitle: 'प्रकरणाचे मूल्यांकन', mrDescription: 'कागदपत्रे व लागू कायद्याचा आढावा घेऊन पुढील दिशा आणि कालमर्यादेबाबत प्रामाणिक मत.' },
  { numeral: 'III', title: 'Filing & Representation', description: 'Drafting, filing and appearance before the concerned court, tribunal or authority.', mrTitle: 'दाखल करणे व प्रतिनिधित्व', mrDescription: 'संबंधित न्यायालय, न्यायाधिकरण किंवा प्राधिकरणासमोर मसुदा, दाखल प्रक्रिया आणि उपस्थिती.' },
  { numeral: 'IV', title: 'Follow-through', description: 'Updates at each hearing until the matter reaches resolution or execution.', mrTitle: 'पुढील कार्यवाही', mrDescription: 'प्रकरण निकाली निघेपर्यंत किंवा अंमलबजावणी होईपर्यंत प्रत्येक सुनावणीची माहिती.' },
];

export const faqs = [
  {
    question: 'छत्रपती संभाजीनगरमध्ये जामीनासाठी वकिलांशी कधी संपर्क करावा?',
    answer: 'अटक, चौकशी किंवा जामीनाची गरज निर्माण होताच शक्य तितक्या लवकर वकिलांशी संपर्क करा. FIR, नोटीस किंवा उपलब्ध कागदपत्रांची माहिती घेऊन या; प्रत्येक प्रकरणाचे तथ्य वेगळे असतात.',
    enQuestion: 'When should I contact an advocate for bail in Chhatrapati Sambhajinagar?',
    enAnswer: 'Contact an advocate as early as possible when arrest, questioning or a bail requirement arises. Bring details of the FIR, notice or available papers; every matter depends on its own facts.',
  },
  {
    question: 'मालमत्ता वादासाठी कोणती कागदपत्रे आवश्यक असतात?',
    answer: 'विक्रीखत, 7/12 उतारा, फेरफार नोंदी, मालमत्ता कर पावती, नकाशे आणि संबंधित नोटिसा उपयुक्त ठरू शकतात. नेमकी कागदपत्रे वादाच्या स्वरूपावर अवलंबून असतात.',
    enQuestion: 'What documents are useful for a property dispute?',
    enAnswer: 'A sale deed, 7/12 extract, mutation entries, property-tax receipts, plans and related notices may be useful. The exact documents depend on the nature of the dispute.',
  },
  {
    question: 'मुंबई उच्च न्यायालय, औरंगाबाद खंडपीठातील रिट याचिकेसाठी सल्ला मिळू शकतो का?',
    answer: 'होय. योग्य उपाय आणि न्यायमंच समजून घेण्यासाठी उपलब्ध आदेश, पत्रव्यवहार आणि इतर संबंधित कागदपत्रांसह सल्लामसलत ठरवा.',
    enQuestion: 'Can I seek advice for a writ petition at the Bombay High Court, Aurangabad Bench?',
    enAnswer: 'Yes. Arrange a consultation with available orders, correspondence and other relevant papers to discuss the appropriate remedy and forum.',
  },
  {
    question: 'पहिल्या सल्लामसलतीत काय माहिती द्यावी?',
    answer: 'घटनेची कालरेषा, संबंधित व्यक्ती, आधीची कारवाई, उपलब्ध कागदपत्रे आणि तुमचे उद्दिष्ट थोडक्यात सांगा. गोपनीय मूळ कागदपत्रे WhatsApp वर पाठवू नका; ती कार्यालयात घेऊन या.',
    enQuestion: 'What should I share at the first consultation?',
    enAnswer: 'Share a brief timeline, the people involved, earlier action, available documents and your objective. Do not send confidential original papers over WhatsApp; bring them to the office.',
  },
];

function App({ route = { language: 'mr', slug: null } } = {}) {
  const { language, slug } = route;
  const [menuOpen, setMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState('idle');
  const isMarathi = language === 'mr';
  const service = slug ? services.find((item) => item.slug === slug) : null;
  const serviceCopy = service ? service[language] : null;
  const home = routePath(language);

  useEffect(() => {
    function onClick(event) {
      const link = event.target.closest?.('a[href^="tel:"], a[href*="wa.me"]');
      if (!link) return;
      trackEvent(link.getAttribute('href').startsWith('tel:') ? 'click_call' : 'click_whatsapp', { page: window.location.pathname });
    }
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const copy = isMarathi ? {
    navAbout: 'परिचय', navPractice: 'कार्य क्षेत्र', navTestimonials: 'अभिप्राय', navProcess: 'कार्यपद्धती', navContact: 'संपर्क', brandRole: 'वकील व कायदेशीर सल्लागार', photoCaption: 'ॲड. संकेत पालनीकर · मुंबई उच्च न्यायालय', directionsNote: 'नोंदणी व अभिप्रायासाठी “Advocate Sanket Palnitkar” शोधा.',
    advocate: 'वकील व कायदेशीर सल्लागार · छत्रपती संभाजीनगर', heroTitle: 'आपल्या प्रकरणासाठी स्पष्ट कायदेशीर दिशा', heroName: 'ॲड. संकेत पालनीकर', heroDescription: 'छत्रपती संभाजीनगर (औरंगाबाद) येथून उच्च न्यायालयीन रिट व दिवाणी, कौटुंबिक, फौजदारी, कामगार, सेवा आणि ग्राहक प्रकरणांतील खटले — तयारीने आणि स्पष्ट युक्तिवादासह.',
    callNow: 'आजच कॉल करा', whatsappNow: 'WhatsApp वर संपर्क करा', viewPractice: 'कार्य क्षेत्र पहा', aboutTitle: 'ॲड. संकेत पालनीकर यांच्याविषयी', qualification: 'बी.ए., एलएल.बी. (ऑनर्स), एलएल.एम. (कॉर्पोरेट कायदा)',
    about1: 'ॲड. संकेत पालनीकर हे सिडको, छत्रपती संभाजीनगर येथून वकिली करतात. त्यांची कार्यपद्धती खटला-केंद्रित आहे: प्रथम तथ्ये, मग योग्य न्यायमंच, आणि त्यानंतर पक्षकाराला समजेल अशी योजना.',
    about2: 'त्यांनी महाराष्ट्र राष्ट्रीय विधी विद्यापीठ, मुंबई येथून कायद्याची पदवी आणि महाराष्ट्र राष्ट्रीय विधी विद्यापीठ, औरंगाबाद येथून एलएल.एम. पूर्ण केले आहे — उच्च न्यायालयीन व रिट कामासाठी संशोधनाधारित पाया.',
    about3: 'प्रत्येक प्रकरण स्वतंत्रपणे हाताळले जाते; गोपनीयता, जोखीम व कालमर्यादेबाबत प्रामाणिक मत आणि प्रकरण निकाली निघेपर्यंत किंवा अंमलबजावणीपर्यंत नियमित माहिती दिली जाते.',
    glance: 'कार्य क्षेत्र एक दृष्टिक्षेपात', areasTitle: 'कार्य क्षेत्र', practices: 'कार्य क्षेत्रे', testimonials: 'कामाबद्दल पक्षकारांचे अनुभव', work: 'आमची कार्यपद्धती', workTitle: 'पहिल्या सल्लामसलतीपासून निकालापर्यंत', faqEyebrow: 'सामान्य प्रश्न', faqTitle: 'कायदेविषयक मदतीबाबत सामान्य प्रश्न',
    workQuote: '“सखोल तयारी. स्पष्ट सल्ला. प्रभावी प्रतिनिधित्व.”',
    contactEyebrow: 'संपर्क', contactTitle: 'वकिलांशी थेट बोला', phone: 'फोन व WhatsApp', office: 'कार्यालय', directions: 'मार्ग', map: 'Google Maps वर पहा',
    call: 'आता कॉल करा', whatsapp: 'WhatsApp', callsNote: 'कार्यालयीन वेळेत कॉल करा. WhatsApp संदेशही स्वीकारले जातात.',
    name: 'नाव', phoneLabel: 'फोन', matterType: 'प्रकरणाचा प्रकार', brief: 'थोडक्यात माहिती', continueWA: 'WhatsApp वर पुढे जा',
    placeholder: 'थोडक्यात तथ्ये — येथे गोपनीय कागदपत्रे पाठवू नका.', formNote: 'गोपनीय कागदपत्रे WhatsApp वर पाठवू नका; मूळ कागदपत्रे कार्यालयात घेऊन या.',
    formTitle: 'संदेश पाठवा', urgency: 'तातडी', urgencyHigh: 'काही दिवसांत सुनावणी किंवा अटकेची शक्यता', urgencyNormal: 'तातडीची तारीख नाही',
    consent: 'या क्रमांकावर माझ्या संदेशाबाबत संपर्क केला जाण्यास माझी संमती आहे. यामुळे वकील-पक्षकार संबंध निर्माण होत नाही हे मला समजले आहे.',
    send: 'संदेश पाठवा', sending: 'पाठवत आहे…', sentTitle: 'धन्यवाद, आपला संदेश मिळाला आहे.', sentBody: 'कार्यालयीन वेळेत आपल्याशी संपर्क साधला जाईल. प्रकरण तातडीचे असल्यास कृपया थेट कॉल करा.', errorMsg: 'संदेश पाठवता आला नाही. कृपया कॉल करा किंवा WhatsApp वापरा.',
    privacySummary: 'आपली माहिती कशी वापरली जाते', privacyText: 'आपले नाव, फोन क्रमांक व संदेश केवळ आपल्या चौकशीला उत्तर देण्यासाठी वापरला जातो. माहिती हटवण्यासाठी किंवा दुरुस्त करण्यासाठी कार्यालयाशी संपर्क साधा.',
    nextTitle: 'संदेश पाठवल्यानंतर काय होते', next1: 'आपण नाव, फोन क्रमांक व प्रकरणाची थोडक्यात माहिती पाठवता.', next2: 'कार्यालयाकडून कार्यालयीन वेळेत आपल्याशी संपर्क साधला जातो.', next3: 'पुढील सल्लामसलत व आवश्यक कागदपत्रांबाबत ठरवले जाते.',
    crumbHome: 'मुख्यपृष्ठ', crumbServices: 'कार्य क्षेत्र', situationsTitle: 'अशा प्रकरणांमध्ये', documentsTitle: 'सल्लामसलतीला कोणती कागदपत्रे आणावीत', serviceFaqTitle: 'सामान्य प्रश्न', otherAreas: 'इतर कार्य क्षेत्रे', readMore: 'अधिक माहिती',
    infoNote: 'ही माहिती सर्वसाधारण आहे; प्रत्येक प्रकरणाचे तथ्य वेगळे असतात. यात कायदेशीर सल्ला नाही आणि कोणत्याही निकालाची हमी दिलेली नाही.',
    disclaimer: 'सूचना: बार कौन्सिल ऑफ इंडियाचे नियम वकिलांना कोणत्याही प्रकारे जाहिरात किंवा याचना करण्यास परवानगी देत नाहीत. ही वेबसाइट केवळ माहितीसाठी आहे. वेबसाइटला भेट देणे किंवा संदेश पाठवणे यामुळे वकील-पक्षकार संबंध निर्माण होत नाही, आणि येथील मजकूर कायदेशीर सल्ला मानू नये.',
  } : {
    navAbout: 'About', navPractice: 'Practice Areas', navTestimonials: 'Testimonials', navProcess: 'How We Work', navContact: 'Contact', brandRole: 'Advocate & Legal Consultant', photoCaption: 'Adv. Sanket Palnitkar · Bombay High Court', directionsNote: 'Search “Advocate Sanket Palnitkar” for the listing and reviews.',
    advocate: 'Advocate & Legal Consultant · Chhatrapati Sambhajinagar', heroTitle: 'Clear legal direction for your matter', heroName: 'Adv. Sanket Palnitkar', heroDescription: 'High Court writ practice and litigation from Chhatrapati Sambhajinagar (Aurangabad) — civil, family, criminal, labour, service and consumer matters, prepared with care and argued with clarity.',
    callNow: 'Call today', whatsappNow: 'Message on WhatsApp', viewPractice: 'View practice areas', aboutTitle: 'About Advocate Sanket Palnitkar', qualification: ' LL.B. (Hons.), LL.M. (Corporate Law)',
    about1: 'Adv. Sanket Palnitkar practises from Cidco, Chhatrapati Sambhajinagar. The work is litigation-first: facts first, then the forum, then a plan the client can follow.',
    about2: 'He holds a law degree from Maharashtra National Law University, Mumbai, and an LLM from Maharashtra National Law University, Aurangabad — a research-heavy foundation for High Court and writ work.',
    about3: 'Each brief is treated as its own problem, with confidentiality, an honest view of risk and timeline, and updates until the matter is disposed of or executed.',
    glance: 'Practice at a glance', areasTitle: 'Practice Areas', practices: 'Areas of Practice', testimonials: 'What clients say about the work', work: 'How We Work', workTitle: 'From first consultation to resolution', faqEyebrow: 'Common questions', faqTitle: 'Answers about getting legal help',
    workQuote: '“Thorough Preparation. Clear Advice. Effective Representation.”',
    contactEyebrow: 'Get in Touch', contactTitle: 'Speak with the advocate directly', phone: 'Phone & WhatsApp', office: 'Office', directions: 'Directions', map: 'Open in Google Maps',
    call: 'Call now', whatsapp: 'WhatsApp', callsNote: 'Calls during office hours. WhatsApp messages are also received.',
    name: 'Name', phoneLabel: 'Phone', matterType: 'Matter type', brief: 'Brief note', continueWA: 'Continue on WhatsApp',
    placeholder: 'Facts in short — do not share sensitive documents here.', formNote: 'Do not send confidential papers over WhatsApp; bring the originals to the office.',
    formTitle: 'Send a message', urgency: 'Urgency', urgencyHigh: 'Hearing or possible arrest within a few days', urgencyNormal: 'No immediate date',
    consent: 'I agree to be contacted on this number about my message. I understand this does not create an advocate-client relationship.',
    send: 'Send message', sending: 'Sending…', sentTitle: 'Thank you — your message has been received.', sentBody: 'The office will contact you during office hours. If the matter is urgent, please call directly.', errorMsg: 'The message could not be sent. Please call or use WhatsApp.',
    privacySummary: 'How your information is used', privacyText: 'Your name, phone number and message are used only to respond to your enquiry. Contact the office to have your information corrected or deleted.',
    nextTitle: 'What happens after you send a message', next1: 'You send your name, phone number and a brief note about the matter.', next2: 'The office contacts you during office hours.', next3: 'The next consultation and the documents needed are then arranged.',
    crumbHome: 'Home', crumbServices: 'Practice Areas', situationsTitle: 'Typical matters', documentsTitle: 'Documents to bring to a consultation', serviceFaqTitle: 'Common questions', otherAreas: 'Other practice areas', readMore: 'Read more',
    infoNote: 'This information is general; every matter turns on its own facts. It is not legal advice and no outcome is promised or implied.',
    disclaimer: 'Notice: The Bar Council of India does not permit advocates to advertise or solicit work in any manner. This website is for information only. Visiting it or sending a message does not create an advocate-client relationship, and its content should not be treated as legal advice.',
  };

  async function submitEnquiry(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    if (formData.get('website')) return;

    const lead = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      matter: formData.get('matter'),
      urgency: formData.get('urgency'),
      note: formData.get('note') || '',
      language,
      page: window.location.pathname,
      source: leadSource(),
      submittedAt: new Date().toISOString(),
    };

    const openWhatsApp = () => {
      const message = [
        `Name: ${lead.name}`,
        `Phone: ${lead.phone}`,
        `Matter type: ${lead.matter}`,
        `Urgency: ${lead.urgency}`,
        `Brief note: ${lead.note || 'Not provided'}`,
        `Source: ${lead.source}`,
      ].join('\n');
      window.location.href = `${firmWhatsAppBase}?text=${encodeURIComponent(message)}`;
    };

    trackEvent('generate_lead', { matter: lead.matter, page: lead.page, source: lead.source });
    if (!leadEndpoint) {
      openWhatsApp();
      return;
    }

    setFormStatus('sending');
    try {
      const response = await fetch(leadEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(lead),
      });
      if (!response.ok) throw new Error(`Lead endpoint responded ${response.status}`);
      setFormStatus('sent');
      form.reset();
    } catch {
      setFormStatus('error');
    }
  }

  const languageSwitch = (location) => (
    <div className={`ref-language ref-language-${location}`} role="group" aria-label="Language">
      <a href={routePath('mr', slug)} lang="mr-IN" aria-current={isMarathi ? 'page' : undefined}>मराठी</a>
      <a href={routePath('en', slug)} lang="en-IN" aria-current={!isMarathi ? 'page' : undefined}>English</a>
    </div>
  );

  return (
    <div className="ref-site">
      <header className="ref-header">
        <a className="ref-brand" href={home} aria-label="Adv. Sanket Palnitkar home">
          <span className="ref-brand-mark" aria-hidden="true">SP</span>
          <span className="ref-brand-copy"><strong>Adv. Sanket Palnitkar</strong><small>{copy.brandRole}</small></span>
        </a>
        <button className="ref-menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="ref-nav" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span><span></span>
        </button>
        <nav id="ref-nav" className={`ref-nav${menuOpen ? ' is-open' : ''}`} aria-label="Primary">
          <a href={`${home}#about`} onClick={() => setMenuOpen(false)}>{copy.navAbout}</a>
          <a href={`${home}#practice`} onClick={() => setMenuOpen(false)}>{copy.navPractice}</a>
          <a href={`${home}#testimonials`} onClick={() => setMenuOpen(false)}>{copy.navTestimonials}</a>
          <a href={`${home}#approach`} onClick={() => setMenuOpen(false)}>{copy.navProcess}</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>{copy.navContact}</a>
        </nav>
        <div className="ref-header-actions">
          {languageSwitch('header')}
          <a className="ref-header-call" href={firmPhoneHref}>{copy.callNow}</a>
          <a className="ref-header-whatsapp" href={firmWhatsApp} target="_blank" rel="noreferrer">{copy.whatsappNow}</a>
        </div>
      </header>

      <main id="main">
        {serviceCopy ? (
          <>
            <section className="ref-service-hero" aria-labelledby="service-title">
              <div className="ref-service-inner">
                <nav className="ref-breadcrumb" aria-label="Breadcrumb">
                  <a href={home}>{copy.crumbHome}</a><span aria-hidden="true">›</span>
                  <a href={`${home}#practice`}>{copy.crumbServices}</a><span aria-hidden="true">›</span>
                  <span aria-current="page">{serviceCopy.name}</span>
                </nav>
                <h1 id="service-title">{serviceCopy.h1}</h1>
                <p className="ref-hero-description">{serviceCopy.intro}</p>
                <div className="ref-hero-actions">
                  <a className="ref-button ref-button-gold" href={firmPhoneHref}>{copy.callNow}</a>
                  <a className="ref-button ref-button-whatsapp" href={firmWhatsApp} target="_blank" rel="noreferrer">{copy.whatsappNow}</a>
                  <a className="ref-button ref-button-outline" href="#contact">{copy.formTitle}</a>
                </div>
              </div>
            </section>

            <section className="ref-service-body" aria-label={serviceCopy.name}>
              <div className="ref-service-columns">
                <div>
                  <h2>{copy.situationsTitle}</h2>
                  <ul>{serviceCopy.situations.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
                <div>
                  <h2>{copy.documentsTitle}</h2>
                  <ul>{serviceCopy.documents.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
              </div>
              <p className="ref-info-note">{copy.infoNote}</p>
            </section>

            <section className="ref-faq" aria-labelledby="service-faq-title">
              <div className="ref-section-heading">
                <p className="ref-kicker">{copy.faqEyebrow}</p>
                <h2 id="service-faq-title">{copy.serviceFaqTitle}</h2>
              </div>
              <div className="ref-faq-list">
                {serviceCopy.faqs.map(([question, answer]) => (
                  <details key={question}>
                    <summary>{question}</summary>
                    <p>{answer}</p>
                  </details>
                ))}
              </div>
            </section>

            <section className="ref-other-areas" aria-labelledby="other-areas-title">
              <h2 id="other-areas-title">{copy.otherAreas}</h2>
              <ul>
                {services.filter((item) => item.slug !== slug).map((item) => (
                  <li key={item.slug}><a href={routePath(language, item.slug)}>{item[language].name}</a></li>
                ))}
              </ul>
            </section>
          </>
        ) : (
        <>
        <section className="ref-hero" aria-labelledby="hero-title">
          <div className="ref-hero-inner">
            <div className="ref-hero-copy">
              <p className="ref-eyebrow">{copy.advocate}</p>
              <h1 id="hero-title"><span>{copy.heroTitle}</span><small>{copy.heroName}</small></h1>
              <p className="ref-hero-description">{copy.heroDescription}</p>
              <div className="ref-hero-actions">
                <a className="ref-button ref-button-gold" href={firmPhoneHref}>{copy.callNow}</a>
                <a className="ref-button ref-button-whatsapp" href={firmWhatsApp} target="_blank" rel="noreferrer">{copy.whatsappNow}</a>
                <a className="ref-button ref-button-outline" href="#practice">{copy.viewPractice}</a>
              </div>
              <section id="about" className="ref-about-card" aria-labelledby="about-title">
                <div className="ref-about-card-heading">
                  <h2 id="about-title">{copy.aboutTitle}</h2>
                  <p>{copy.qualification}</p>
                </div>
                <p>{copy.about1}</p>
                <p>{copy.about2}</p>
                <p>{copy.about3}</p>
              </section>
            </div>
            <figure className="ref-hero-figure">
              <img src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1100&q=85" alt="Law books and a judge's gavel" fetchPriority="high" />
              <figcaption>{copy.photoCaption}</figcaption>
            </figure>
          </div>
        </section>

        <section className="ref-glance" aria-labelledby="glance-title">
          <div className="ref-glance-inner">
            <p className="ref-kicker">{copy.glance}</p>
            <div className="ref-glance-content">
              <h2 id="glance-title">{copy.practices}</h2>
              <ol>
                {practiceAreasContent.map((area) => <li key={area.id}><a href={`#${area.id}`}><span>{area.number}</span><span>{isMarathi ? area.mrTitle : area.title}</span><span aria-hidden="true">↗</span></a></li>)}
              </ol>
            </div>
          </div>
        </section>

        <section id="practice" className="ref-practice" aria-labelledby="practice-title">
          <div className="ref-section-heading">
            <p className="ref-kicker">{copy.practices}</p>
            <h2 id="practice-title">{copy.areasTitle}</h2>
          </div>
          <div className="ref-practice-grid">
            {practiceAreasContent.map((area) => (
              <article className="ref-practice-card" id={area.id} key={area.id}>
                <span className="ref-section-number">Section {area.number}</span>
                <h3>{isMarathi ? area.mrTitle : area.title}</h3>
                <p>{isMarathi ? area.mrDescription : area.description}</p>
                <ul>{(isMarathi ? area.mrPoints : area.points).map((point) => <li key={point}>{point}</li>)}</ul>
                <a className="ref-card-link" href={routePath(language, services.find((item) => item.areaId === area.id)?.slug)}>{copy.readMore} <span aria-hidden="true">→</span></a>
              </article>
            ))}
          </div>
        </section>

        <section id="testimonials" className="ref-testimonials" aria-labelledby="testimonials-title">
          <div className="ref-section-heading ref-section-heading-light">
            <p className="ref-kicker">Client Words</p>
            <h2 id="testimonials-title">{copy.testimonials}</h2>
          </div>
          <div className="ref-testimonial-grid">
            {testimonials.map((item) => <figure className="ref-quote" key={item.client}>
              <span className="ref-quote-mark" aria-hidden="true">“</span>
              <blockquote>{item.quote}</blockquote>
              <figcaption>{item.client}</figcaption>
            </figure>)}
          </div>
        </section>

        <section id="approach" className="ref-process" aria-labelledby="process-title">
          <div className="ref-process-inner">
            <div className="ref-section-heading">
              <p className="ref-kicker">{copy.work}</p>
              <h2 id="process-title">{copy.workTitle}</h2>
              <p className="ref-process-quote">{copy.workQuote}</p>
            </div>
            <ol className="ref-steps">
              {workSteps.map((step) => <li key={step.numeral}>
                <span className="ref-step-number">{step.numeral}</span>
                <h3>{isMarathi ? step.mrTitle : step.title}</h3>
                <p>{isMarathi ? step.mrDescription : step.description}</p>
              </li>)}
            </ol>
          </div>
        </section>

        <section className="ref-faq" aria-labelledby="faq-title">
          <div className="ref-section-heading">
            <p className="ref-kicker">{copy.faqEyebrow}</p>
            <h2 id="faq-title">{copy.faqTitle}</h2>
          </div>
          <div className="ref-faq-list">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{isMarathi ? faq.question : faq.enQuestion}</summary>
                <p>{isMarathi ? faq.answer : faq.enAnswer}</p>
              </details>
            ))}
          </div>
        </section>
        </>
        )}

        <section id="contact" className="ref-contact" aria-labelledby="contact-title">
          <div className="ref-section-heading ref-section-heading-light">
            <p className="ref-kicker">{copy.contactEyebrow}</p>
            <h2 id="contact-title">{copy.contactTitle}</h2>
          </div>
          <div className="ref-contact-grid">
            <div className="ref-contact-details">
              <section className="ref-contact-block">
                <p className="ref-kicker">{copy.phone}</p>
                <h3><a href={firmPhoneHref}>{firmPhone}</a></h3>
                <p>{copy.callsNote}</p>
                <div className="ref-contact-actions">
                  <a className="ref-button ref-button-gold" href={firmPhoneHref}>{copy.call}</a>
                  <a className="ref-button ref-button-outline" href={firmWhatsApp} target="_blank" rel="noreferrer">{copy.whatsapp}</a>
                </div>
              </section>
              <section className="ref-contact-block ref-next-steps">
                <p className="ref-kicker">{copy.nextTitle}</p>
                <ol>
                  <li>{copy.next1}</li>
                  <li>{copy.next2}</li>
                  <li>{copy.next3}</li>
                </ol>
              </section>
            </div>
            {formStatus === 'sent' ? (
              <div className="ref-enquiry-form ref-form-success" role="status">
                <h3>{copy.sentTitle}</h3>
                <p>{copy.sentBody}</p>
                <a className="ref-button ref-button-gold" href={firmPhoneHref}>{copy.call}</a>
              </div>
            ) : (
            <form className="ref-enquiry-form" onSubmit={submitEnquiry}>
              <h3 className="ref-form-title">{copy.formTitle}</h3>
              <label>{copy.name}<input name="name" autoComplete="name" required /></label>
              <label>{copy.phoneLabel}<input name="phone" type="tel" inputMode="tel" autoComplete="tel" pattern="[0-9+\s\-]{10,15}" required /></label>
              <label>{copy.matterType}<select name="matter" defaultValue={service ? matterByArea[service.areaId] : 'High Court / Writ'}>
                <option value="High Court / Writ">{isMarathi ? 'उच्च न्यायालय / रिट' : 'High Court / Writ'}</option>
                <option value="Civil / Property">{isMarathi ? 'दिवाणी / मालमत्ता' : 'Civil / Property'}</option>
                <option value="Family / Matrimonial">{isMarathi ? 'कौटुंबिक / वैवाहिक' : 'Family / Matrimonial'}</option>
                <option value="Criminal">{isMarathi ? 'फौजदारी' : 'Criminal'}</option>
                <option value="Labour / Service / MAT">{isMarathi ? 'कामगार / सेवा / MAT' : 'Labour / Service / MAT'}</option>
                <option value="Consumer / Notice">{isMarathi ? 'ग्राहक / नोटीस' : 'Consumer / Notice'}</option>
                <option value="Other">{isMarathi ? 'इतर' : 'Other'}</option>
              </select></label>
              <label>{copy.urgency}<select name="urgency" defaultValue="No immediate date">
                <option value="No immediate date">{copy.urgencyNormal}</option>
                <option value="Hearing or possible arrest within days">{copy.urgencyHigh}</option>
              </select></label>
              <label>{copy.brief}<textarea name="note" rows="4" placeholder={copy.placeholder}></textarea></label>
              <input className="ref-honeypot" name="website" tabIndex="-1" autoComplete="off" aria-hidden="true" />
              <label className="ref-consent"><input type="checkbox" name="consent" required /><span>{copy.consent}</span></label>
              <button className="ref-button ref-button-gold" type="submit" disabled={formStatus === 'sending'}>{formStatus === 'sending' ? copy.sending : copy.send}</button>
              {formStatus === 'error' && <p className="ref-form-error" role="alert">{copy.errorMsg}</p>}
              <p className="ref-form-note">{copy.formNote}</p>
              <details className="ref-privacy">
                <summary>{copy.privacySummary}</summary>
                <p>{copy.privacyText}</p>
              </details>
            </form>
            )}
          </div>
        </section>
      </main>

      <footer className="ref-footer">
        <p>© {new Date().getFullYear()} Adv. Sanket Palnitkar, Chhatrapati Sambhajinagar. All rights reserved.</p>
        <nav aria-label="Footer"><a href={firmPhoneHref}>{copy.call}</a><a href={firmWhatsApp} target="_blank" rel="noreferrer">{copy.whatsapp}</a><a href={`${home}#about`}>{copy.navAbout}</a><a href={`${home}#practice`}>{copy.navPractice}</a></nav>
        <p className="ref-disclaimer">{copy.disclaimer}</p>
      </footer>
      <div className="ref-mobile-actions"><a href={firmPhoneHref}>{copy.call}</a><a href={firmWhatsApp} target="_blank" rel="noreferrer">{copy.whatsapp}</a></div>
    </div>
  );
}

export default App;
