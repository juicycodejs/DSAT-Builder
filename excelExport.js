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

  // Build section sheets
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
    // Section info row is not needed as a single row, so skip it

    // Get questions for this section from the questions array
    const sectionQuestions = data.questions ? data.questions.filter(q => q.sectionId === section.id) : [];
    
    // Build question rows with consecutive numbering
    const questionRows = sectionQuestions.map((q, idx) => [
      idx + 1,
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

    ]);

    const sheetData = [sectionInfoHeader, ...questionRows];
    const ws = XLSX.utils.aoa_to_sheet(sheetData);
    XLSX.utils.book_append_sheet(wb, ws, section.id);
  });
  return wb;
}

module.exports = { createWorkbook };
