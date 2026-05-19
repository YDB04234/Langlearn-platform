import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../stores/authStore';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { ProgressBar } from '../components/common/ProgressBar';
import { 
  Volume2, RotateCcw, ChevronLeft, ChevronRight,
  CheckCircle2, XCircle, Sparkles, FlipHorizontal, BookOpen, TrendingUp, Award
} from 'lucide-react';
import { 
  vocabularyDatabase, 
  vocabularyCategoryInfo,
  VocabularyCategory,
  VocabularyWord 
} from '../data/vocabularyDatabase';

interface FlashCard extends VocabularyWord {
  mastered: boolean;
}

export default function VocabularyModule() {
  const { isAuthenticated, addXP } = useAuthStore();
  const [selectedCategory, setSelectedCategory] = useState<VocabularyCategory>('daily');
  const [cards, setCards] = useState<FlashCard[]>(
    vocabularyDatabase[selectedCategory].map(word => ({ ...word, mastered: false }))
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [knownCount, setKnownCount] = useState(0);

  const categories = Object.keys(vocabularyDatabase) as VocabularyCategory[];

  const handleCategoryChange = (category: VocabularyCategory) => {
    setSelectedCategory(category);
    setCards(vocabularyDatabase[category].map(word => ({ ...word, mastered: false })));
    setCurrentIndex(0);
    setIsFlipped(false);
    setShowResult(false);
    setKnownCount(0);
  };

  const currentCard = cards[currentIndex];
  const progress = Math.round(((currentIndex + 1) / cards.length) * 100);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleKnow = () => {
    const updatedCards = cards.map((card, idx) => 
      idx === currentIndex ? { ...card, mastered: true } : card
    );
    setCards(updatedCards);
    setKnownCount(prev => prev + 1);
    addXP(10);
    nextCard();
  };

  const handleDontKnow = () => {
    const updatedCards = cards.map((card, idx) => 
      idx === currentIndex ? { ...card, mastered: false } : card
    );
    setCards(updatedCards);
    nextCard();
  };

  const nextCard = () => {
    setIsFlipped(false);
    if (currentIndex < cards.length - 1) {
      setTimeout(() => setCurrentIndex(currentIndex + 1), 200);
    } else {
      setShowResult(true);
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(currentIndex - 1), 200);
    }
  };

  const resetCards = () => {
    setCards(vocabularyDatabase[selectedCategory].map(word => ({ ...word, mastered: false })));
    setCurrentIndex(0);
    setIsFlipped(false);
    setKnownCount(0);
    setShowResult(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="text-blue-600" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">单词记忆</h2>
          <p className="text-gray-600 mb-6">登录后开始你的单词记忆训练</p>
        </Card>
      </div>
    );
  }

  if (showResult) {
    const accuracy = Math.round((knownCount / cards.length) * 100);
    return (
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Card className="py-12">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="text-white" size={48} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">练习完成！</h2>
            <p className="text-gray-600 mb-8">你完成了 {vocabularyCategoryInfo[selectedCategory].name} 的学习</p>
            
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div>
                <p className="text-3xl font-bold text-gray-900">{cards.length}</p>
                <p className="text-sm text-gray-500">总单词数</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-green-600">{knownCount}</p>
                <p className="text-sm text-gray-500">已掌握</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-600">{accuracy}%</p>
                <p className="text-sm text-gray-500">正确率</p>
              </div>
            </div>

            <div className="flex gap-4 justify-center flex-wrap">
              <Button onClick={resetCards} variant="outline">
                再练一次
              </Button>
              <Button onClick={() => setShowResult(false)}>
                选择其他词汇
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">单词记忆</h1>
          <p className="text-gray-600">使用闪卡系统记忆单词</p>
        </div>
      </div>

      <Card className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">选择词汇分类</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === category
                  ? `bg-gradient-to-r ${vocabularyCategoryColors[category]} text-white shadow-lg`
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {vocabularyCategoryInfo[category].name}
            </button>
          ))}
        </div>
      </Card>

      <Card className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-600">
            进度 {currentIndex + 1} / {cards.length}
          </span>
          <span className="text-sm font-medium text-primary-english">
            {progress}% 完成
          </span>
        </div>
        <ProgressBar value={progress} color={`from-blue-500 to-blue-600`} />
        <div className="mt-2 flex items-center gap-2">
          <span className="text-xs text-gray-500">
            {vocabularyCategoryInfo[selectedCategory].name}
          </span>
        </div>
      </Card>

      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCard.id}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card 
              className="cursor-pointer min-h-[400px] flex flex-col"
              onClick={handleFlip}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  {currentCard.mastered ? (
                    <span className="px-2 py-1 bg-green-100 text-green-600 text-xs font-medium rounded-full">
                      已掌握
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                      待学习
                    </span>
                  )}
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    currentCard.difficulty === 'easy' ? 'bg-green-100 text-green-600' :
                    currentCard.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {currentCard.difficulty === 'easy' ? '简单' :
                     currentCard.difficulty === 'medium' ? '中等' : '困难'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <span className="text-sm">点击翻转</span>
                  <FlipHorizontal size={16} />
                </div>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                  {!isFlipped ? (
                    <motion.div
                      key="front"
                      initial={{ opacity: 0, rotateY: 180 }}
                      animate={{ opacity: 1, rotateY: 0 }}
                      exit={{ opacity: 0, rotateY: 180 }}
                      className="text-center"
                    >
                      <h2 className="text-5xl font-bold text-gray-900 mb-4">
                        {currentCard.word}
                      </h2>
                      <p className="text-xl text-gray-500 mb-2">
                        {currentCard.pronunciation}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="back"
                      initial={{ opacity: 0, rotateY: -180 }}
                      animate={{ opacity: 1, rotateY: 0 }}
                      exit={{ opacity: 0, rotateY: -180 }}
                      className="text-center"
                    >
                      <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        {currentCard.meaning}
                      </h2>
                      <div className="bg-gray-50 rounded-xl p-6 mt-4">
                        <p className="text-gray-700 italic mb-2">"{currentCard.example}"</p>
                        <p className="text-gray-500">{currentCard.exampleMeaning}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const utterance = new SpeechSynthesisUtterance(currentCard.word);
                    utterance.lang = 'en-US';
                    speechSynthesis.speak(utterance);
                  }}
                  className="p-3 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                >
                  <Volume2 size={24} />
                </button>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>

        {isFlipped && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-4 mt-6"
          >
            <Button
              onClick={handleDontKnow}
              variant="outline"
              className="flex-1 py-6 text-lg"
            >
              <XCircle className="mr-2" size={24} />
              还不太熟
            </Button>
            <Button
              onClick={handleKnow}
              className="flex-1 py-6 text-lg bg-gradient-to-r from-green-500 to-emerald-500"
            >
              <CheckCircle2 className="mr-2" size={24} />
              已掌握
            </Button>
          </motion.div>
        )}

        <div className="flex items-center justify-between mt-6">
          <Button
            variant="ghost"
            onClick={prevCard}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="mr-1" size={20} />
            上一张
          </Button>
          <Button variant="ghost" onClick={resetCards}>
            <RotateCcw className="mr-1" size={20} />
            重新开始
          </Button>
          <Button
            variant="ghost"
            onClick={nextCard}
            disabled={currentIndex === cards.length - 1}
          >
            下一张
            <ChevronRight className="ml-1" size={20} />
          </Button>
        </div>
      </div>

      <Card className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
            <Sparkles className="text-blue-600" size={24} />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">学习小技巧</h4>
            <p className="text-sm text-gray-600">点击卡片翻转查看释义，配合发音按钮练习听说</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
