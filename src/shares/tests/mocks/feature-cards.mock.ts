export interface FeatureCardTestCase {
  input: FeatureCardTestCaseInput;
  expected:FeatureCardTestCaseExpected
}

export interface FeatureCardTestCaseInput {
  color: string;
  key: string;
  data: Array<string>;
}

export interface FeatureCardTestCaseExpected {
  title: string;
  icon: string;
  data: string;
  details?: string;
  path?: string;
  labelPath?: string;
  bgColor: string;
  textColor: string;
  dataColor: string;
}

export const FEATURES_CARDS_TEST_CASES = [
  {
    input: {
      color: 'sky',
      key: 'planning',
      data: ['09h - 18h'],
    },
    expected: {
      title: 'Planning',
      icon: 'calendar-month',
      details: "Aujourd'hui",
      bgColor: 'bg-sky-900/8',
      textColor: 'text-sky-400',
      dataColor: 'text-sky-500',
    },
  },
  {
    input: {
      color: 'orange',
      key: 'vacations',
      data: ['data-mock'],
    },
    expected: {
      title: 'Planning2',
      icon: 'calendar-month',
      bgColor: 'bg-orange-900/8',
      textColor: 'text-orange-400',
      dataColor: 'text-orange-500',
    },
  },
  {
    input: {
      color: 'green',
      key: 'salaries',
      data: ['data-mock'],
    },
    expected: {
      title: 'Planning2',
      icon: 'calendar-month',
      path: 'salaries',
      labelPath: 'Mes fiches de paie',
      bgColor: 'bg-green-900/8',
      textColor: 'text-green-400',
      dataColor: 'text-green-500',
    },
  },
  {
    input: {
      color: 'indigo',
      key: 'human-resources',
      data: ['data-mock'],
    },
    expected: {
      title: 'Planning2',
      icon: 'calendar-month',
      path: 'hr',
      labelPath: 'Mon dossier',
      bgColor: 'bg-indigo-900/8',
      textColor: 'text-indigo-400',
      dataColor: 'text-indigo-500',
    },
  },
  {
    input: {
      color: 'rose',
      key: 'formations',
      data: ['data-mock'],
    },
    expected: {
      title: 'Planning2',
      icon: 'calendar-month',
      path: 'formations',
      labelPath: 'Mes formations',
      bgColor: 'bg-rose-900/8',
      textColor: 'text-rose-400',
      dataColor: 'text-rose-500',
    },
  },
  {
    input: {
      color: 'gray',
      key: 'settings',
      data: ['data-mock'],
    },
    expected: {
      title: 'Planning2',
      icon: 'calendar-month',
      path: 'settings',
      labelPath: 'Mes paramètres',
      bgColor: 'bg-gray-900/8',
      textColor: 'text-gray-400',
      dataColor: 'text-gray-500',
    },
  },
];
