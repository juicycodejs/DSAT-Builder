// excelExport.js
// Module to generate an Excel file with separate sheets for each test section
const XLSX = require('xlsx');

function createWorkbook(data) {
  const wb = XLSX.utils.book_new();
  
  // Build metadata sheet for all sections
  const metadataHeader = [
    'ID',
    'Name',
    'Timer',
    'ScoringScale',
    'Question',
    'Description',
    'Calculator',
    'Annotation',
    'Review',
    'CrossOption',
  ];
  const metadataRows = data.sections.map(section => [
    section.id,
    section.name,
    section.timer,
    section.scoringScale,
    section.numberOfQuestions,
    section.description,
    section.permissions && section.permissions.calculatorAllowed ? 'Yes' : 'No',
    section.permissions && section.permissions.annotationAllowed ? 'Yes' : 'No',
    section.permissions && section.permissions.reviewAllowed ? 'Yes' : 'No',
    section.permissions && section.permissions.crossOptionAllowed ? 'Yes' : 'No'
  ]);
  const metadataSheetData = [metadataHeader, ...metadataRows];
  const metadataSheet = XLSX.utils.aoa_to_sheet(metadataSheetData);
  XLSX.utils.book_append_sheet(wb, metadataSheet, 'Section Metadata');

  // Create scoring worksheet
  const scoringHeaders = ['CorrectQ', 'Scale1', 'Scale2'];
  const scoringData = data.scoringData || [];
  
  // Transform scoring data into rows
  const scoringRows = scoringData.map(row => ({
    'CorrectQ': row.CorrectQ,
    'Scale1': row.Scale1,
    'Scale2': row.Scale2 || ''
  }));
  
  const scoringWS = XLSX.utils.json_to_sheet(scoringRows, {
    header: scoringHeaders
  });
  // Set column widths for scoring worksheet
  scoringWS['!cols'] = [
    { wch: 15 },  
    { wch: 15 }, 
    { wch: 15 }   
  ];

  XLSX.utils.book_append_sheet(wb, scoringWS, 'Scoring');

  // Build section sheets with proper question ordering
  data.sections.forEach(section => {
    const sectionInfoHeader = [
      'QuestionNumber',
      'CorrectAnswer',
      'Concepts',
      'Strategies',
      'QuestionType',
      'Passage',
      'QuestionImage',
      'AnswerImage',
      'QuestionText',
      'Option_A',
      'Option_B',
      'Option_C',
      'Option_D',
      'Option_E',
      'Option_F',
      'Option_G',
      'Option_H',
      'Option_I',
      'Option_J',
    ];

    // Get questions for this section and sort them by orderInSection
    const sectionQuestions = data.questions ? 
      data.questions
        .filter(q => q.sectionId === section.id)
        .sort((a, b) => (a.orderInSection || 0) - (b.orderInSection || 0)) : [];
    
    // Build question rows with proper ordering
    const questionRows = sectionQuestions.map((q, idx) => {
      // Use the actual orderInSection if available, otherwise fall back to array index
      const questionNumber = q.orderInSection || (idx + 1);
      
      return [
        questionNumber,
        q.correctAnswer || '',
        q.concepts || '',
        q.learningStrategies || '',
        q.type || '',
        q.additionalOptions && q.additionalOptions.includeReadingPassage ? 'Yes' : 'No',
        q.additionalOptions && q.additionalOptions.includeQuestionImage ? 'Yes' : 'No',
        q.additionalOptions && q.additionalOptions.includeAnswerImages ? 'Yes' : 'No',
        q.questionText || '',
        q.options ? (q.options.A || '') : '',
        q.options ? (q.options.B || '') : '',
        q.options ? (q.options.C || '') : '',
        q.options ? (q.options.D || '') : '',
        q.options ? (q.options.E || '') : '',
        q.options ? (q.options.F || '') : '',
        q.options ? (q.options.G || '') : '',
        q.options ? (q.options.H || '') : '',
        q.options ? (q.options.I || '') : '',
        q.options ? (q.options.J || '') : '',
      ];
    });

    const sheetData = [sectionInfoHeader, ...questionRows];
    const ws = XLSX.utils.aoa_to_sheet(sheetData);
    
    // Set column widths for better readability
    ws['!cols'] = [
      { wch: 15 },  // QuestionNumber
      { wch: 15 },  // CorrectAnswer
      { wch: 20 },  // Concepts
      { wch: 20 },  // Strategies
      { wch: 12 },  // QuestionType
      { wch: 10 },  // Passage
      { wch: 15 },  // QuestionImage
      { wch: 15 },  // AnswerImage
      { wch: 40 },  // QuestionText
      { wch: 25 },  // Option_A
      { wch: 25 },  // Option_B
      { wch: 25 },  // Option_C
      { wch: 25 },  // Option_D
      { wch: 25 },  // Option_E
      { wch: 25 },  // Option_F
      { wch: 25 },  // Option_G
      { wch: 25 },  // Option_H
      { wch: 25 },  // Option_I
      { wch: 25 },  // Option_J
    ];
    
    XLSX.utils.book_append_sheet(wb, ws, section.id);
  });
  
  return wb;
}

module.exports = { createWorkbook };
