import { Course, Lesson, Achievement, CommunityPost, User, LearningProgress } from '../types';

// 词汇分类
export type VocabularyCategory = 'cet4' | 'cet6' | 'toefl' | 'ielts' | 'daily';

export interface VocabularyWord {
  id: string;
  word: string;
  pronunciation: string;
  meaning: string;
  example: string;
  exampleMeaning: string;
  category: VocabularyCategory;
  difficulty: 'easy' | 'medium' | 'hard';
}

// 词汇数据
export const vocabularyData: Record<VocabularyCategory, VocabularyWord[]> = {
  daily: [
    { id: 'd1', word: 'hello', pronunciation: '/həˈloʊ/', meaning: '你好，问候', example: 'Hello, how are you?', exampleMeaning: '你好，你怎么样？', category: 'daily', difficulty: 'easy' },
    { id: 'd2', word: 'goodbye', pronunciation: '/ɡʊdˈbaɪ/', meaning: '再见', example: 'Goodbye, see you tomorrow!', exampleMeaning: '再见，明天见！', category: 'daily', difficulty: 'easy' },
    { id: 'd3', word: 'morning', pronunciation: '/ˈmɔːrnɪŋ/', meaning: '早晨，上午', example: 'Good morning!', exampleMeaning: '早上好！', category: 'daily', difficulty: 'easy' },
    { id: 'd4', word: 'evening', pronunciation: '/ˈiːvnɪŋ/', meaning: '傍晚，晚上', example: 'Good evening!', exampleMeaning: '晚上好！', category: 'daily', difficulty: 'easy' },
    { id: 'd5', word: 'night', pronunciation: '/naɪt/', meaning: '夜晚', example: 'Good night!', exampleMeaning: '晚安！', category: 'daily', difficulty: 'easy' },
  ],
  cet4: [
    { id: 'c41', word: 'abandon', pronunciation: '/əˈbændən/', meaning: '放弃，抛弃', example: 'The sailors had to abandon the ship.', exampleMeaning: '水手们不得不弃船。', category: 'cet4', difficulty: 'medium' },
    { id: 'c42', word: 'ability', pronunciation: '/əˈbɪləti/', meaning: '能力，才能', example: 'She has the ability to speak three languages.', exampleMeaning: '她有说三种语言的能力。', category: 'cet4', difficulty: 'easy' },
    { id: 'c43', word: 'able', pronunciation: '/ˈeɪbəl/', meaning: '能够的，有能力的', example: 'He is able to finish the work on time.', exampleMeaning: '他能够按时完成工作。', category: 'cet4', difficulty: 'easy' },
    { id: 'c44', word: 'about', pronunciation: '/əˈbaʊt/', meaning: '关于，大约', example: 'What is the book about?', exampleMeaning: '这本书是关于什么的？', category: 'cet4', difficulty: 'easy' },
    { id: 'c45', word: 'above', pronunciation: '/əˈbʌv/', meaning: '在...上面', example: 'The birds flew above the clouds.', exampleMeaning: '鸟儿飞过云层。', category: 'cet4', difficulty: 'easy' },
    { id: 'c46', word: 'abroad', pronunciation: '/əˈbrɔːd/', meaning: '在国外，到国外', example: 'She studied abroad for two years.', exampleMeaning: '她在国外学习了两年。', category: 'cet4', difficulty: 'medium' },
    { id: 'c47', word: 'absence', pronunciation: '/ˈæbsəns/', meaning: '缺席，不在场', example: 'His absence was noticed by the teacher.', exampleMeaning: '老师注意到了他的缺席。', category: 'cet4', difficulty: 'medium' },
    { id: 'c48', word: 'absolute', pronunciation: '/ˈæbsəluːt/', meaning: '绝对的，完全的', example: 'It is an absolute necessity.', exampleMeaning: '这是绝对必要的。', category: 'cet4', difficulty: 'medium' },
    { id: 'c49', word: 'absorb', pronunciation: '/əbˈzɔːrb/', meaning: '吸收，吸引', example: 'Plants absorb water from the soil.', exampleMeaning: '植物从土壤中吸收水分。', category: 'cet4', difficulty: 'medium' },
    { id: 'c410', word: 'abstract', pronunciation: '/ˈæbstrækt/', meaning: '抽象的，摘要', example: 'The concept is too abstract for children.', exampleMeaning: '这个概念对孩子来说太抽象了。', category: 'cet4', difficulty: 'medium' },
  ],
  cet6: [
    { id: 'c61', word: 'abundant', pronunciation: '/əˈbʌndənt/', meaning: '丰富的，充裕的', example: 'We have abundant evidence to support the claim.', exampleMeaning: '我们有充足的证据支持这一主张。', category: 'cet6', difficulty: 'hard' },
    { id: 'c62', word: 'academy', pronunciation: '/əˈkædəmi/', meaning: '学院，专科院校', example: 'She graduated from the Academy of Music.', exampleMeaning: '她毕业于音乐学院。', category: 'cet6', difficulty: 'medium' },
    { id: 'c63', word: 'accelerate', pronunciation: '/əkˈseləreɪt/', meaning: '加速，加快', example: 'The car accelerated to 100 mph.', exampleMeaning: '汽车加速到每小时100英里。', category: 'cet6', difficulty: 'hard' },
    { id: 'c64', word: 'accommodate', pronunciation: '/əˈkɒmədeɪt/', meaning: '容纳，适应', example: 'The hotel can accommodate 500 guests.', exampleMeaning: '这家酒店可容纳500位客人。', category: 'cet6', difficulty: 'hard' },
    { id: 'c65', word: 'accomplish', pronunciation: '/əˈkʌmplɪʃ/', meaning: '完成，达到', example: 'We accomplished our mission successfully.', exampleMeaning: '我们成功完成了任务。', category: 'cet6', difficulty: 'medium' },
    { id: 'c66', word: 'accumulate', pronunciation: '/əˈkjuːmjəleɪt/', meaning: '积累，堆积', example: 'Snow accumulated on the roof.', exampleMeaning: '雪在屋顶上堆积。', category: 'cet6', difficulty: 'hard' },
    { id: 'c67', word: 'accurate', pronunciation: '/ˈækjərət/', meaning: '准确的，精确的', example: 'The weather forecast is usually accurate.', exampleMeaning: '天气预报通常很准确。', category: 'cet6', difficulty: 'medium' },
    { id: 'c68', word: 'achieve', pronunciation: '/əˈtʃiːv/', meaning: '达到，获得', example: 'She achieved excellent results in her exams.', exampleMeaning: '她在考试中取得了优异的成绩。', category: 'cet6', difficulty: 'medium' },
    { id: 'c69', word: 'acknowledge', pronunciation: '/əkˈnɒlɪdʒ/', meaning: '承认，认可', example: 'He acknowledged his mistake.', exampleMeaning: '他承认了自己的错误。', category: 'cet6', difficulty: 'hard' },
    { id: 'c610', word: 'acquire', pronunciation: '/əˈkwaɪər/', meaning: '获得，学到', example: 'She acquired a good knowledge of French.', exampleMeaning: '她学会了法语。', category: 'cet6', difficulty: 'hard' },
  ],
  toefl: [
    { id: 't1', word: 'advocate', pronunciation: '/ˈædvəkeɪt/', meaning: '提倡，拥护', example: 'He advocates for environmental protection.', exampleMeaning: '他提倡环境保护。', category: 'toefl', difficulty: 'hard' },
    { id: 't2', word: 'aesthetic', pronunciation: '/esˈθetɪk/', meaning: '美学的，审美的', example: 'The building has a strong aesthetic appeal.', exampleMeaning: '这座建筑有很强的美学吸引力。', category: 'toefl', difficulty: 'hard' },
    { id: 't3', word: 'aggregate', pronunciation: '/ˈæɡrɪɡət/', meaning: '合计，聚集', example: 'The data were aggregated for analysis.', exampleMeaning: '数据被汇总以便分析。', category: 'toefl', difficulty: 'hard' },
    { id: 't4', word: 'alleviate', pronunciation: '/əˈliːvieɪt/', meaning: '减轻，缓和', example: 'The medicine alleviated the pain.', exampleMeaning: '药物减轻了疼痛。', category: 'toefl', difficulty: 'hard' },
    { id: 't5', word: 'ambiguous', pronunciation: '/æmˈbɪɡjuəs/', meaning: '模糊的，含糊的', example: 'The statement was ambiguous and confusing.', exampleMeaning: '声明含糊不清，令人困惑。', category: 'toefl', difficulty: 'hard' },
    { id: 't6', word: 'ameliorate', pronunciation: '/əˈmiːliəreɪt/', meaning: '改善，改进', example: 'Steps were taken to ameliorate working conditions.', exampleMeaning: '已采取措施改善工作条件。', category: 'toefl', difficulty: 'hard' },
    { id: 't7', word: 'analogous', pronunciation: '/əˈnæləɡəs/', meaning: '类似的，可比的', example: 'The situation is analogous to what happened before.', exampleMeaning: '情况与之前发生的类似。', category: 'toefl', difficulty: 'hard' },
    { id: 't8', word: 'analyze', pronunciation: '/ˈænəlaɪz/', meaning: '分析，研究', example: 'We need to analyze the data carefully.', exampleMeaning: '我们需要仔细分析数据。', category: 'toefl', difficulty: 'medium' },
    { id: 't9', word: 'annual', pronunciation: '/ˈænjuəl/', meaning: '每年的，年度的', example: 'The company holds an annual meeting.', exampleMeaning: '公司举行年度会议。', category: 'toefl', difficulty: 'medium' },
    { id: 't10', word: 'anticipate', pronunciation: '/ænˈtɪsɪpeɪt/', meaning: '预期，期望', example: 'We anticipate strong sales this quarter.', exampleMeaning: '我们预期本季度销售强劲。', category: 'toefl', difficulty: 'medium' },
  ],
  ielts: [
    { id: 'i1', word: 'accommodate', pronunciation: '/əˈkɒmədeɪt/', meaning: '容纳，适应，提供住宿', example: 'The hotel can accommodate up to 300 guests.', exampleMeaning: '这家酒店可容纳300位客人。', category: 'ielts', difficulty: 'hard' },
    { id: 'i2', word: 'acquire', pronunciation: '/əˈkwaɪər/', meaning: '获得，取得', example: 'She acquired a degree in economics.', exampleMeaning: '她获得了经济学学位。', category: 'ielts', difficulty: 'medium' },
    { id: 'i3', word: 'adequate', pronunciation: '/ˈædɪkwət/', meaning: '足够的，适当的', example: 'The food was adequate but not excellent.', exampleMeaning: '食物足够但不出色。', category: 'ielts', difficulty: 'medium' },
    { id: 'i4', word: 'adjacent', pronunciation: '/əˈdʒeɪsənt/', meaning: '邻近的，毗连的', example: 'The garden is adjacent to the house.', exampleMeaning: '花园紧邻房屋。', category: 'ielts', difficulty: 'hard' },
    { id: 'i5', word: 'advocate', pronunciation: '/ˈædvəkeɪt/', meaning: '提倡，拥护', example: 'He advocates for renewable energy.', exampleMeaning: '他提倡可再生能源。', category: 'ielts', difficulty: 'hard' },
    { id: 'i6', word: 'aggregate', pronunciation: '/ˈæɡrɪɡət/', meaning: '总计，聚集', example: 'The aggregate score was very high.', exampleMeaning: '总分很高。', category: 'ielts', difficulty: 'hard' },
    { id: 'i7', word: 'alleviate', pronunciation: '/əˈliːvieɪt/', meaning: '减轻，缓和', example: 'Measures to alleviate poverty.', exampleMeaning: '减轻贫困的措施。', category: 'ielts', difficulty: 'hard' },
    { id: 'i8', word: 'allocate', pronunciation: '/ˈæləkeɪt/', meaning: '分配，拨出', example: 'The budget was allocated to different projects.', exampleMeaning: '预算被分配到不同的项目。', category: 'ielts', difficulty: 'hard' },
    { id: 'i9', word: 'alter', pronunciation: '/ˈɔːltər/', meaning: '改变，修改', example: 'You can alter your reservation online.', exampleMeaning: '您可以在线修改预订。', category: 'ielts', difficulty: 'medium' },
    { id: 'i10', word: 'alternative', pronunciation: '/ɔːlˈtɜːrnətɪv/', meaning: '替代的，选择的', example: 'Is there an alternative route?', exampleMeaning: '有别的路线吗？', category: 'ielts', difficulty: 'medium' },
  ],
};

export const vocabularyCategoryNames: Record<VocabularyCategory, string> = {
  daily: '日常英语',
  cet4: '大学英语四级',
  cet6: '大学英语六级',
  toefl: '托福词汇',
  ielts: '雅思词汇',
};

export const vocabularyCategoryColors: Record<VocabularyCategory, string> = {
  daily: 'from-green-400 to-emerald-500',
  cet4: 'from-blue-400 to-blue-600',
  cet6: 'from-purple-400 to-purple-600',
  toefl: 'from-orange-400 to-orange-600',
  ielts: 'from-red-400 to-red-600',
};

export const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'demo@linguaflow.com',
    nickname: '语言爱好者',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    role: 'user',
    preferredLanguages: ['english', 'japanese'],
    currentLanguage: 'english',
    currentLevel: 'A2',
    createdAt: '2024-01-15',
    streak: 7,
    totalXP: 1250,
    level: 5,
  },
];

export const mockCourses: Course[] = [
  {
    id: 'en-a1-daily',
    language: 'english',
    title: '日常英语入门',
    description: '学习日常生活中的基础英语表达，从问候到购物',
    level: 'A1',
    category: 'daily',
    totalLessons: 20,
    completedLessons: 5,
    isLocked: false,
    imageUrl: 'https://images.unsplash.com/photo-1546961342-ea5f60b193f7?w=400',
    color: '#1E3A5F',
  },
  {
    id: 'en-a2-daily',
    language: 'english',
    title: '日常英语进阶',
    description: '提升日常交流能力，学习更多实用场景表达',
    level: 'A2',
    category: 'daily',
    totalLessons: 25,
    completedLessons: 0,
    isLocked: false,
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400',
    color: '#2563EB',
  },
  {
    id: 'en-b1-business',
    language: 'english',
    title: '商务英语基础',
    description: '掌握职场英语必备词汇和表达',
    level: 'B1',
    category: 'business',
    totalLessons: 30,
    completedLessons: 0,
    isLocked: true,
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400',
    color: '#059669',
  },
  {
    id: 'jp-a1-daily',
    language: 'japanese',
    title: '日语五十音入门',
    description: '从零开始学习日语假名和基础发音',
    level: 'A1',
    category: 'daily',
    totalLessons: 15,
    completedLessons: 0,
    isLocked: false,
    imageUrl: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=400',
    color: '#FFB7C5',
  },
  {
    id: 'jp-a2-travel',
    language: 'japanese',
    title: '日本旅游日语',
    description: '旅行必备日语，让你的日本之旅更轻松',
    level: 'A2',
    category: 'travel',
    totalLessons: 20,
    completedLessons: 0,
    isLocked: false,
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400',
    color: '#F472B6',
  },
  {
    id: 'kr-a1-daily',
    language: 'korean',
    title: '韩语基础发音',
    description: '学习韩语字母表和基本发音规则',
    level: 'A1',
    category: 'daily',
    totalLessons: 12,
    completedLessons: 0,
    isLocked: false,
    imageUrl: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?w=400',
    color: '#98D8C8',
  },
  {
    id: 'kr-a2-culture',
    language: 'korean',
    title: '韩流文化入门',
    description: '通过K-pop和韩剧学习韩语',
    level: 'A2',
    category: 'culture',
    totalLessons: 18,
    completedLessons: 0,
    isLocked: false,
    imageUrl: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=400',
    color: '#FDA4AF',
  },
];

export const mockLessons: Lesson[] = [
  {
    id: 'lesson-1',
    courseId: 'en-a1-daily',
    title: 'Greetings',
    description: '学习基本的问候语',
    duration: 15,
    completed: false,
    type: 'vocabulary',
  },
  {
    id: 'lesson-2',
    courseId: 'en-a1-daily',
    title: 'Numbers',
    description: '学习数字1-100',
    duration: 20,
    completed: false,
    type: 'vocabulary',
  },
  {
    id: 'lesson-3',
    courseId: 'en-a1-daily',
    title: 'Colors',
    description: '学习基本颜色词汇',
    duration: 15,
    completed: false,
    type: 'vocabulary',
  },
];

export const mockAchievements: Achievement[] = [
  {
    id: 'ach-1',
    title: '初学者',
    description: '完成第一课学习',
    icon: '🎯',
    unlockedAt: '2024-01-15',
    type: 'milestone',
  },
  {
    id: 'ach-2',
    title: '单词达人',
    description: '学习100个新单词',
    icon: '📚',
    type: 'milestone',
  },
  {
    id: 'ach-3',
    title: '连续7天',
    description: '保持7天学习 streak',
    icon: '🔥',
    unlockedAt: '2024-01-22',
    type: 'streak',
  },
  {
    id: 'ach-4',
    title: '口语新手',
    description: '完成第一次口语练习',
    icon: '🎤',
    type: 'skill',
  },
];

export const mockCommunityPosts: CommunityPost[] = [
  {
    id: 'post-1',
    userId: 'user-1',
    userName: '语言爱好者',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    content: '今天学习了日语的五十音图，感觉很有趣！有没有一起学习的小伙伴？',
    likes: 24,
    comments: 8,
    createdAt: '2024-01-20T10:30:00Z',
    language: 'japanese',
    tags: ['日语学习', '五十音'],
  },
  {
    id: 'post-2',
    userId: 'user-2',
    userName: '韩语迷',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie',
    content: '分享一个超好用的韩语学习App，界面简洁美观，内容也很实用！',
    likes: 56,
    comments: 12,
    createdAt: '2024-01-19T15:20:00Z',
    language: 'korean',
    tags: ['学习资源', 'App推荐'],
  },
  {
    id: 'post-3',
    userId: 'user-3',
    userName: '英语老师',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    content: '给大家分享一些英语学习的技巧，坚持每天听力和口语练习真的很重要！',
    likes: 89,
    comments: 23,
    createdAt: '2024-01-18T09:15:00Z',
    language: 'english',
    tags: ['英语学习', '学习方法'],
  },
];

export const mockLearningProgress: LearningProgress = {
  userId: 'user-1',
  courses: {
    'en-a1-daily': { progress: 25, lessonsCompleted: 5, totalLessons: 20 },
  },
  vocabulary: {
    totalLearned: 156,
    mastered: 89,
    reviewing: 42,
    total: 500,
  },
  speaking: {
    totalMinutes: 45,
    sessionsCompleted: 8,
  },
  listening: {
    totalMinutes: 120,
    exercisesCompleted: 15,
  },
  grammar: {
    exercisesCompleted: 32,
    accuracy: 78,
  },
  streakDays: 7,
  lastActiveDate: '2024-01-20',
};
