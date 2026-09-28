const projectButtons = document.querySelectorAll('.project-toggle');

projectButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const target = document.getElementById(button.getAttribute('aria-controls'));
    const isOpen = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!isOpen));
    target.hidden = isOpen;
    button.textContent = isOpen ? 'Projekt öffnen' : 'Projekt schließen';
  });
});

const skillMap = {
  datenanalyse: {
    title: 'Datenanalyse',
    projects: [
      ['ungleichheit','Ökonomische Ungleichheit in der Schweiz','Bachelorarbeit'],
      ['sunk-cost','Sunk Cost Fallacy im digitalen Lernkontext','Experiment']
    ]
  },
  statistik: {
    title: 'Statistik',
    projects: [
      ['ungleichheit','Ökonomische Ungleichheit in der Schweiz','Gini, Theil, Palma, Verteilungsanalyse'],
      ['sunk-cost','Sunk Cost Fallacy im digitalen Lernkontext','ANOVA, Regression, Hypothesentests'],
      ['methodik-ungleichheit','Measuring Economic Inequality','Vergleich statistischer Ungleichheitsmaße']
    ]
  },
  rstudio: {
    title: 'RStudio',
    projects: [
      ['ungleichheit','Ökonomische Ungleichheit in der Schweiz','Berechnung von Ungleichheitsmaßen'],
      ['sunk-cost','Sunk Cost Fallacy im digitalen Lernkontext','Statistische Auswertung']
    ]
  },
  excel: {
    title: 'Excel / Google Sheets',
    projects: [
      ['sunk-cost','Sunk Cost Fallacy im digitalen Lernkontext','Datenanalyse und Auswertung']
    ]
  },
  qualtrics: {
    title: 'Qualtrics',
    projects: [
      ['sunk-cost','Sunk Cost Fallacy im digitalen Lernkontext','Randomisiertes Online-Experiment']
    ]
  },
  visualisierung: {
    title: 'Datenvisualisierung',
    projects: [
      ['ungleichheit','Ökonomische Ungleichheit in der Schweiz','Ungleichheits- und Verteilungsdarstellungen'],
      ['sunk-cost','Sunk Cost Fallacy im digitalen Lernkontext','Boxplots und Ergebnisgrafiken'],
      ['sika','Management & Strategie bei Sika AG','Darstellung internationaler Umsatzentwicklung'],
      ['methodik-ungleichheit','Measuring Economic Inequality','Lorenzkurven und Vergleichsgrafiken']
    ]
  },
  forschung: {
    title: 'Ökonomische Forschung',
    projects: [
      ['ungleichheit','Ökonomische Ungleichheit in der Schweiz','Empirische Bachelorarbeit'],
      ['sunk-cost','Sunk Cost Fallacy im digitalen Lernkontext','Eigene experimentelle Studie'],
      ['mobility','Mobility Pricing in Genf','Kritische Analyse empirischer Forschung'],
      ['crime','Ökonomie von Kriminalität und Strafe','Theoretische Analyse'],
      ['public-goods','Public Goods, Reziprozität & Konformität','Literaturbasierte Analyse']
    ]
  },
  policy: {
    title: 'Policy-Analyse',
    projects: [
      ['mobility','Mobility Pricing in Genf','Verkehrs- und Umweltpolitik'],
      ['wealth-tax','Vermögenssteuer in der Schweiz','Steuerpolitik und Policy Memo'],
      ['crime','Ökonomie von Kriminalität und Strafe','Abschreckung und gesellschaftliche Kosten']
    ]
  },
  behavioral: {
    title: 'Verhaltensökonomie',
    projects: [
      ['sunk-cost','Sunk Cost Fallacy im digitalen Lernkontext','Sunk Cost Bias'],
      ['public-goods','Public Goods, Reziprozität & Konformität','Soziale Präferenzen und Kooperation'],
      ['wealth-tax','Vermögenssteuer in der Schweiz','Verhaltensreaktionen auf Besteuerung']
    ]
  },
  game: {
    title: 'Mikroökonomie & Spieltheorie',
    projects: [
      ['public-goods','Public Goods, Reziprozität & Konformität','Public-Goods-Spiel und Free-Riding'],
      ['crime','Ökonomie von Kriminalität und Strafe','Anreize, Nutzen und Optimierung']
    ]
  },
  strategie: {
    title: 'Unternehmensstrategie',
    projects: [
      ['lufthansa','Organisationsstruktur der Lufthansa Group','Struktur und Strategie'],
      ['sika','Management & Strategie bei Sika AG','Unternehmensstrategie'],
      ['nestle','Wachstumsstrategie bei Nestlé','Ansoff-Matrix']
    ]
  },
  organisation: {
    title: 'Organisation & Management',
    projects: [
      ['lufthansa','Organisationsstruktur der Lufthansa Group','Matrixorganisation und Entscheidungsrechte'],
      ['sika','Management & Strategie bei Sika AG','Hybride Organisationsstruktur']
    ]
  },
  markt: {
    title: 'Markt- & Wachstumsanalyse',
    projects: [
      ['sika','Management & Strategie bei Sika AG','Internationale Absatzmärkte'],
      ['nestle','Wachstumsstrategie bei Nestlé','Produkt-Markt-Strategien'],
      ['mobility','Mobility Pricing in Genf','Nachfrage- und Akzeptanzdimension']
    ]
  },
  evidenz: {
    title: 'Literatur- & Evidenzsynthese',
    projects: [
      ['wealth-tax','Vermögenssteuer in der Schweiz','Empirische Steuerliteratur → Policy-Empfehlung'],
      ['mobility','Mobility Pricing in Genf','Bewertung einer empirischen Studie'],
      ['crime','Ökonomie von Kriminalität und Strafe','Theorie- und Literaturvergleich'],
      ['public-goods','Public Goods, Reziprozität & Konformität','Experimentalökonomische Literatur'],
      ['methodik-ungleichheit','Measuring Economic Inequality','Vergleich von Messmethoden']
    ]
  }
};

const dialog = document.getElementById('skill-dialog');
const dialogTitle = document.getElementById('skill-dialog-title');
const list = document.getElementById('skill-project-list');

document.querySelectorAll('.skill-button').forEach((button) => {
  button.addEventListener('click', () => {
    const item = skillMap[button.dataset.skill];
    dialogTitle.textContent = item.title;
    list.innerHTML = '';

    item.projects.forEach(([id, title, note]) => {
      const a = document.createElement('a');
      a.href = `#${id}`;
      a.className = 'skill-project-link';
      a.innerHTML = `<strong>${title}</strong><span>${note}</span>`;
      a.addEventListener('click', () => {
        dialog.close();
        const article = document.getElementById(id);
        if (article) {
          const toggle = article.querySelector('.project-toggle');
          const details = article.querySelector('.project-details');
          if (toggle && details && details.hidden) {
            details.hidden = false;
            toggle.setAttribute('aria-expanded', 'true');
            toggle.textContent = 'Projekt schließen';
          }
        }
      });
      list.appendChild(a);
    });

    dialog.showModal();
  });
});

document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});
