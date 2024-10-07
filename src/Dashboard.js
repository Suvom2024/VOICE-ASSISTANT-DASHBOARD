import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart,PieChart as RePieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { 
  MessageCircle, Users, Clock, CheckCircle, BarChart2, Mic, Image,
  Globe, AlertTriangle, Zap, AlertCircle, XCircle, Phone,Database,
  Play, Pause, AlertOctagon,
  Volume2, VolumeX, Layers,
  X, ThumbsUp,Tag,Loader ,TrendingUp,
  ChevronLeft, ChevronRight,Star 
} from 'lucide-react';
import { 
  UserGroupIcon, 
  ChatBubbleLeftIcon, 
  TagIcon, 
  FaceSmileIcon, 
  FaceFrownIcon, 
  MinusCircleIcon 
} from '@heroicons/react/24/solid';// Custom styled components
const Button = ({ children, onClick, className = '', ...props }) => (
  <motion.button
    className={`px-4 py-2 rounded-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${className}`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    {...props}
  >
    {children}
  </motion.button>
);
const StatCard = ({ icon, title, value, change, isDarkMode }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
  >
    <Card className={`overflow-hidden ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'} shadow-lg rounded-xl`}>
      <div className={`h-1 w-full ${getGradientColor(change)}`} />
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            {icon}
          </div>
          <motion.span 
            className={`text-sm font-medium px-3 py-1 rounded-full ${getChangeColor(change)}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {change}
          </motion.span>
        </div>
        <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>{title}</h3>
        <motion.p 
          className="text-3xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {value}
        </motion.p>
      </div>
    </Card>
  </motion.div>
);
const Card = ({ children, className = '', ...props }) => (
  <motion.div
    className={`bg-white rounded-xl shadow-lg p-6 ${className}`}
    whileHover={{ scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300, damping: 10 }}
    {...props}
  >
    {children}
  </motion.div>
);

const mockData = {
  totalUsers: 15482,
  activeConversations: 3245,
  avgResponseTime: 0.8,
  successRate: 99.2,
  totalMessages: 150000,
  audioProcessed: 25000,
  imagesProcessed: 18000,
  textProcessed: 107000,
  languagesSupported: ['Hindi', 'English', 'Urdu', 'Bengali', 'Tamil', 'Telugu', 'Marathi', 'Gujarati', 'Kannada', 'Odia'],
  performanceData: [
    { name: 'Mon', messages: 4000, audioFiles: 2400, images: 2400 },
    { name: 'Tue', messages: 3000, audioFiles: 1398, images: 2210 },
    { name: 'Wed', messages: 5000, audioFiles: 3800, images: 2290 },
    { name: 'Thu', messages: 2780, audioFiles: 3908, images: 2000 },
    { name: 'Fri', messages: 1890, audioFiles: 4800, images: 2181 },
    { name: 'Sat', messages: 2390, audioFiles: 3800, images: 2500 },
    { name: 'Sun', messages: 3490, audioFiles: 4300, images: 2100 },
  ],
  messageTypes: [
    { name: 'Text', value: 65 },
    { name: 'Audio', value: 20 },
    { name: 'Image', value: 15 },
  ],
  userInteractions: [
    { id: 1, phoneNumber: '+1 (555) 123-4567', messageCount: 15, sentiment: 'positive', topic: 'Product inquiries' },
    { id: 2, phoneNumber: '+1 (555) 987-6543', messageCount: 8, sentiment: 'neutral', topic: 'Technical support' },
    { id: 3, phoneNumber: '+1 (555) 246-8135', messageCount: 22, sentiment: 'positive', topic: 'Billing questions' },
    { id: 4, phoneNumber: '+1 (555) 369-2580', messageCount: 5, sentiment: 'negative', topic: 'Complaints' },
    { id: 5, phoneNumber: '+1 (555) 147-2589', messageCount: 17, sentiment: 'positive', topic: 'Product inquiries' },
  ],
  messageVolumeData: [
    { date: '2023-05-01', incoming: 5000, outgoing: 4800 },
    { date: '2023-05-02', incoming: 5500, outgoing: 5300 },
    { date: '2023-05-03', incoming: 4800, outgoing: 4600 },
    { date: '2023-05-04', incoming: 6000, outgoing: 5800 },
    { date: '2023-05-05', incoming: 5200, outgoing: 5000 },
    { date: '2023-05-06', incoming: 4500, outgoing: 4300 },
    { date: '2023-05-07', incoming: 5800, outgoing: 5600 },
  ],
  userActivityData: [
    { date: '2023-05-01', activeUsers: 8000, newUsers: 500 },
    { date: '2023-05-02', activeUsers: 8200, newUsers: 450 },
    { date: '2023-05-03', activeUsers: 7800, newUsers: 400 },
    { date: '2023-05-04', activeUsers: 8500, newUsers: 550 },
    { date: '2023-05-05', activeUsers: 8100, newUsers: 480 },
    { date: '2023-05-06', activeUsers: 7500, newUsers: 350 },
    { date: '2023-05-07', activeUsers: 8300, newUsers: 520 },
  ],
  apiUsageData: [
    { name: 'Twilio', usage: 8500 },
    { name: 'Bedrock', usage: 12000 },
    { name: 'OpenAI Whisper', usage: 3500 },
    { name: 'ElevenLabs TTS', usage: 2800 },
  ],
  errorData: [
    { date: '2023-05-01', errors: 25 },
    { date: '2023-05-02', errors: 20 },
    { date: '2023-05-03', errors: 30 },
    { date: '2023-05-04', errors: 15 },
    { date: '2023-05-05', errors: 22 },
    { date: '2023-05-06', errors: 18 },
    { date: '2023-05-07', errors: 28 },
  ],
  lambdaHealth: 98,
  dynamoDBHealth: 99,
  s3Health: 100,
  languageStats: [
    { name: 'Hindi', percentage: 35 },
    { name: 'English', percentage: 30 },
    { name: 'Bengali', percentage: 10 },
    { name: 'Tamil', percentage: 8 },
    { name: 'Telugu', percentage: 7 },
    { name: 'Marathi', percentage: 5 },
    { name: 'Gujarati', percentage: 3 },
    { name: 'Kannada', percentage: 2 },
  ],
  recentActivity: [
    { icon: <Users size={16} />, iconBg: "bg-blue-100 text-blue-600", title: "New user registered", description: "Farmer from Uttar Pradesh joined", time: "5 min ago" },
    { icon: <MessageCircle size={16} />, iconBg: "bg-green-100 text-green-600", title: "New conversation", description: "Query about wheat cultivation", time: "10 min ago" },
    { icon: <Image size={16} />, iconBg: "bg-purple-100 text-purple-600", title: "Image processed", description: "Crop disease identification", time: "15 min ago" },
    { icon: <Mic size={16} />, iconBg: "bg-yellow-100 text-yellow-600", title: "Audio transcribed", description: "Weather forecast request", time: "20 min ago" },
  ],
  conversations: [
    { id: 1, user: '+91 98765 43210', lastMessage: 'कृपया मुझे गेहूं की खेती के बारे में बताएं', time: '10 mins ago', status: 'active' },
    { id: 2, user: '+91 87654 32109', lastMessage: 'What are the best practices for organic farming?', time: '25 mins ago', status: 'active' },
    { id: 3, user: '+91 76543 21098', lastMessage: 'مجھے کھاد کے بارے میں مزید معلومات چاہیے', time: '1 hour ago', status: 'resolved' },
    { id: 4, user: '+91 65432 10987', lastMessage: 'আমি ধান চাষের জন্য সেরা সার সম্পর্কে জানতে চাই', time: '2 hours ago', status: 'pending' },
    { id: 5, user: '+91 54321 09876', lastMessage: 'வேளாண் இயந்திரங்களைப் பற்றி மேலும் தகவல் தேவை', time: '3 hours ago', status: 'active' },
  ],
  knowledgeBaseStats: [
    { name: 'Agriculture', articles: 500, queries: 15000 },
    { name: 'Weather', articles: 200, queries: 12000 },
    { name: 'Market Prices', articles: 300, queries: 10000 },
    { name: 'Pest Control', articles: 250, queries: 8000 },
    { name: 'Government Schemes', articles: 150, queries: 5000 },
  ],
  audioTranscripts: [
    { id: 1, filename: 'farmer_query_1.mp3', duration: '1:30', transcript: 'मुझे फसल बीमा योजना के बारे में जानकारी चाहिए।' },
    { id: 2, filename: 'weather_update.mp3', duration: '0:45', transcript: 'कल मौसम कैसा रहेगा? क्या बारिश होगी?' },
    { id: 3, filename: 'market_prices.mp3', duration: '2:15', transcript: 'आज के बाजार में गेहूं और चावल के दाम क्या हैं?' },
  ],
};
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [isAudioPlayerOpen, setIsAudioPlayerOpen] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    });
  }, [controls, activeTab]);

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const handleTabChange = (tab) => {
    setIsLoading(true);
    setActiveTab(tab);
    
    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const renderActiveTabContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-64">
          <Loader className={`w-12 h-12 animate-spin ${isDarkMode ? 'text-white' : 'text-gray-800'}`} />
        </div>
      );
    }

    switch (activeTab) {
      case 'overview':
        return <OverviewTab isDarkMode={isDarkMode} mockData={mockData} />;
      case 'conversations':
        return <ConversationsTab isDarkMode={isDarkMode} mockData={mockData} selectedConversation={selectedConversation} setSelectedConversation={setSelectedConversation} />;
      case 'audio transcripts':
        return <AudioTranscriptsTab isDarkMode={isDarkMode} mockData={mockData} handleAudioPlay={handleAudioPlay} />;
      case 'knowledge base':
        return <KnowledgeBaseTab isDarkMode={isDarkMode} mockData={mockData} />;
      case 'error monitoring':
        return <ErrorMonitoringTab isDarkMode={isDarkMode} />;
      default:
        return <OverviewTab isDarkMode={isDarkMode} mockData={mockData} />;
    }
  };

  const handleAudioPlay = (audio) => {
    setCurrentAudio(audio);
    setIsAudioPlayerOpen(true);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.src = `/audio/${audio.filename}`;
      audioRef.current.play();
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
    setIsMuted(vol === 0);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className={`flex h-screen ${isDarkMode ? 'dark bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'}`}>
      {/* Sidebar */}
      <motion.div
        className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl h-full ${
          isExpanded ? 'w-64' : 'w-20'
        } transition-all duration-300 ease-in-out overflow-hidden relative`}
        initial={false}
        animate={{ width: isExpanded ? 256 : 80 }}
      >
        <div className="flex items-center justify-between p-4">
          <motion.h1
            className={`text-2xl font-bold ${isDarkMode ? 'text-indigo-400' : 'text-indigo-700'}`}
            initial={false}
            animate={{ opacity: isExpanded ? 1 : 0 }}
          >
            {isExpanded ? 'AI Assistant' : ''}
          </motion.h1>
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`${isDarkMode ? 'bg-gray-700 text-indigo-400' : 'bg-indigo-100 text-indigo-700'} hover:bg-indigo-200`}
          >
            {isExpanded ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
          </Button>
        </div>
        <nav className="mt-8">
          {[
            { name: 'Overview', icon: BarChart2 },
            { name: 'Conversations', icon: MessageCircle },
            { name: 'Audio Transcripts', icon: Mic },
            { name: 'Knowledge Base', icon: Database },
            { name: 'Error Monitoring', icon: AlertCircle },
          ].map((item) => (
            <motion.button
              key={item.name}
              onClick={() => handleTabChange(item.name.toLowerCase())}
              className={`flex items-center w-full p-4 text-left transition-colors duration-200 ${
                activeTab === item.name.toLowerCase()
                  ? isDarkMode ? 'bg-indigo-900 text-indigo-200' : 'bg-indigo-100 text-indigo-700'
                  : isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-indigo-50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <item.icon className="w-6 h-6 mr-4" />
              <motion.span
                initial={false}
                animate={{ opacity: isExpanded ? 1 : 0 }}
                className="text-sm font-medium"
              >
                {item.name}
              </motion.span>
            </motion.button>
          ))}
        </nav>

      </motion.div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            {renderActiveTabContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Audio Player */}
      <AnimatePresence>
        {isAudioPlayerOpen && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className={`fixed bottom-0 left-0 right-0 ${
              isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'
            } shadow-lg p-4`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button onClick={togglePlay}>
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </Button>
                <div>
                  <p className="font-semibold">{currentAudio?.filename}</p>
                  <p className="text-sm text-gray-500">{currentAudio?.transcript}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="0"
                  max={duration}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-64"
                />
                <p>{formatTime(currentTime)} / {formatTime(duration)}</p>
                <Button onClick={toggleMute}>
                  {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                </Button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-24"
                />
                <Button onClick={() => setIsAudioPlayerOpen(false)}>
                  <X size={24} />
                </Button>
              </div>
            </div>
            <audio
              ref={audioRef}
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => setIsPlaying(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
const redColorPalette = ['#FEE2E2', '#FECACA', '#FCA5A5', '#F87171', '#EF4444', '#DC2626', '#B91C1C', '#991B1B'];

const OverviewTab = ({ isDarkMode, mockData }) => {
  const gradientBg = isDarkMode ? 'bg-gradient-to-br from-blue-900 to-purple-900' : 'bg-gradient-to-br from-blue-100 to-purple-100';

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <motion.h1 
        className={`text-5xl font-extrabold ${isDarkMode ? 'text-grey-990' : 'text-grey-990'} mb-4`}
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        Dashboard Overview
      </motion.h1>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Users className={`w-8 h-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`} />}
          title="Total Users"
          value={mockData.totalUsers.toLocaleString()}
          change="+12.5%"
          isDarkMode={isDarkMode}
        />
        <StatCard
          icon={<MessageCircle className={`w-8 h-8 ${isDarkMode ? 'text-green-400' : 'text-green-500'}`} />}
          title="Active Conversations"
          value={mockData.activeConversations.toLocaleString()}
          change="+8.1%"
          isDarkMode={isDarkMode}
        />
        <StatCard
          icon={<Clock className={`w-8 h-8 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-500'}`} />}
          title="Avg. Response Time"
          value={`${mockData.avgResponseTime}s`}
          change="-0.3s"
          isDarkMode={isDarkMode}
        />
        <StatCard
          icon={<CheckCircle className={`w-8 h-8 ${isDarkMode ? 'text-purple-400' : 'text-purple-500'}`} />}
          title="Success Rate"
          value={`${mockData.successRate}%`}
          change="+0.7%"
          isDarkMode={isDarkMode}
        />
      </div>

      {/* Charts and Detailed Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Card className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} overflow-hidden h-full`}>
            <div className={`p-6 ${gradientBg} h-full`}>
              <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-6 flex items-center`}>
                <BarChart2 className="w-8 h-8 mr-3 text-blue-500" />
                Message Volume
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={mockData.messageVolumeData}>
                  <defs>
                    <linearGradient id="colorIncoming" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorOutgoing" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
                  <XAxis dataKey="date" stroke={isDarkMode ? '#9ca3af' : '#6b7280'} />
                  <YAxis stroke={isDarkMode ? '#9ca3af' : '#6b7280'} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                      border: 'none',
                      borderRadius: '0.375rem',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    }}
                    itemStyle={{ color: isDarkMode ? '#e5e7eb' : '#374151' }}
                  />
                  <Area type="monotone" dataKey="incoming" stackId="1" stroke="#8884d8" fillOpacity={1} fill="url(#colorIncoming)" />
                  <Area type="monotone" dataKey="outgoing" stackId="1" stroke="#82ca9d" fillOpacity={1} fill="url(#colorOutgoing)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Card className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} overflow-hidden h-full`}>
          <div className={`p-6 ${gradientBg} h-full`}>
              <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-6 flex items-center`}>
                <PieChart className="w-8 h-8 mr-3 text-blue-500" />
                Message Types
              </h3>
              <ResponsiveContainer width="100%" height={300}>
          <PieChart>
          <Pie
        data={mockData.messageTypes}
        cx="50%"
        cy="50%"
        labelLine={false}
        outerRadius={150}
        innerRadius={60}
        fill="#8884d8"
        dataKey="value"
        paddingAngle={3}
      >
        {mockData.messageTypes.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: isDarkMode ? '#374151' : 'white', 
                borderColor: isDarkMode ? '#4B5563' : '#E5E7EB',
                borderRadius: '8px',
              }} 
              itemStyle={{ color: isDarkMode ? 'white' : 'black' }}
            />
            <Legend 
              layout="vertical" 
              align="right" 
              verticalAlign="middle"
              wrapperStyle={{ paddingLeft: '20px' }}
            />
          </PieChart>
        </ResponsiveContainer>
            </div>
          </Card>

        </motion.div>
        
      </div>

      {/* User Activity and API Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Card className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} overflow-hidden h-full`}>
          <div className={`p-6 ${gradientBg} h-full`}>
              <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-6 flex items-center`}>
                <Users className="w-8 h-8 mr-3 text-blue-500" />
                User Activity
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockData.userActivityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
                  <XAxis dataKey="date" stroke={isDarkMode ? '#9ca3af' : '#6b7280'} />
                  <YAxis stroke={isDarkMode ? '#9ca3af' : '#6b7280'} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                      border: 'none',
                      borderRadius: '0.375rem',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    }}
                    itemStyle={{ color: isDarkMode ? '#e5e7eb' : '#374151' }}
                  />
                  <Line type="monotone" dataKey="activeUsers" stroke="#8884d8" strokeWidth={2} />
                  <Line type="monotone" dataKey="newUsers" stroke="#82ca9d" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Card className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} overflow-hidden h-full`}>
          <div className={`p-6 ${gradientBg} h-full`}>
              <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-6 flex items-center`}>
                <Zap className="w-8 h-8 mr-3 text-blue-500" />
                API Usage
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockData.apiUsageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
                  <XAxis dataKey="name" stroke={isDarkMode ? '#9ca3af' : '#6b7280'} />
                  <YAxis stroke={isDarkMode ? '#9ca3af' : '#6b7280'} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                      border: 'none',
                      borderRadius: '0.375rem',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    }}
                    itemStyle={{ color: isDarkMode ? '#e5e7eb' : '#374151' }}
                  />
                  <Bar dataKey="usage" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* User Interactions and Error Monitoring */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <EnhancedUserInteractionsCard/>

        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Card className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} overflow-hidden h-full`}>
          <div className={`p-6 ${gradientBg} h-full`}>
              <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-6 flex items-center`}>
                <AlertTriangle className="w-8 h-8 mr-3 text-blue-500" />
                Error Monitoring
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockData.errorData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
                  <XAxis dataKey="date" stroke={isDarkMode ? '#9ca3af' : '#6b7280'} />
                  <YAxis stroke={isDarkMode ? '#9ca3af' : '#6b7280'} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                      border: 'none',
                      borderRadius: '0.375rem',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    }}
                    itemStyle={{ color: isDarkMode ? '#e5e7eb' : '#374151' }}
                  />
                  <Line type="monotone" dataKey="errors" stroke="#ff7300" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>


      </div>
    </motion.div>
  );
};

const EnhancedUserInteractionsCard = ({ isDarkMode = false }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const sortedInteractions = [...mockData.userInteractions].sort((a, b) => {
    if (sortConfig.key === null) return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const cardBg = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const textColor = isDarkMode ? 'text-white' : 'text-gray-800';
  const borderColor = isDarkMode ? 'border-gray-700' : 'border-gray-200';

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className={`rounded-xl shadow-2xl overflow-hidden ${cardBg} border ${borderColor}`}
    >
      <div className="p-6">
        <h3 className={`text-2xl font-bold ${textColor} mb-6 flex items-center`}>
          <UserGroupIcon className="w-8 h-8 mr-3 text-blue-500" />
          User Interactions
        </h3>
        <div className={`overflow-hidden rounded-xl border ${borderColor}`}>
          <table className="min-w-full divide-y divide-gray-200">
            {/* ... table header remains the same ... */}
            <tbody className={`${cardBg} divide-y ${borderColor}`}>
              {sortedInteractions.map((interaction, index) => (
                <motion.tr 
                  key={interaction.id} 
                  className={`hover:${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'} transition-colors duration-150 ease-in-out`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${textColor}`}>{interaction.phoneNumber}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${textColor}`}>
                    <span className="flex items-center">
                      <ChatBubbleLeftIcon className="w-5 h-5 mr-2 text-blue-500" />
                      {interaction.messageCount}
                    </span>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm`}>
                    <span className={`px-3 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full
                      ${interaction.sentiment === 'positive' ? 'bg-green-100 text-green-800' : 
                        interaction.sentiment === 'negative' ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'}`}>
                      {interaction.sentiment === 'positive' ? <FaceSmileIcon className="w-4 h-4 mr-1" /> :
                       interaction.sentiment === 'negative' ? <FaceFrownIcon className="w-4 h-4 mr-1" /> :
                       <MinusCircleIcon className="w-4 h-4 mr-1" />}
                      {interaction.sentiment}
                    </span>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${textColor}`}>
                    <span className="flex items-center">
                      <TagIcon className="w-5 h-5 mr-2 text-purple-500" />
                      {interaction.topic}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};
const ErrorMonitoringTab = ({ isDarkMode }) => {
  // Dummy data for error monitoring
  const errorData = {
    totalErrors: 1250,
    uniqueErrors: 78,
    criticalErrors: 15,
    resolvedErrors: 1172,
    errorTypes: [
      { name: 'API Timeout', value: 450 },
      { name: 'NLP Processing', value: 320 },
      { name: 'Data Inconsistency', value: 280 },
      { name: 'User Input', value: 200 },
    ],
    errorSources: [
      { source: 'API Gateway', count: 180 },
      { source: 'DynamoDB', count: 150 },
      { source: 'Frontend', count: 200 },
      { source: 'Auth Service', count: 120 },
      { source: 'Payment Gateway', count: 80 },
    ],
    recentErrors: [
      { id: 1, type: 'API Timeout', message: 'Failed to fetch weather data', timestamp: '2023-05-07 14:23:15', status: 'Open' },
      { id: 2, type: 'NLP Processing', message: 'Unable to parse user intent', timestamp: '2023-05-07 13:45:30', status: 'Resolved' },
      { id: 3, type: 'Data Inconsistency', message: 'Mismatch in crop price data', timestamp: '2023-05-07 12:10:45', status: 'In Progress' },
      { id: 4, type: 'User Input', message: 'Invalid input format for date', timestamp: '2023-05-07 11:30:22', status: 'Open' },
      { id: 5, type: 'API Timeout', message: 'Failed to fetch market prices', timestamp: '2023-05-07 10:15:18', status: 'Resolved' },
    ],
  };

  return (
    <div className="space-y-8">
      <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-6 flex items-center`}>
        <AlertCircle className="w-10 h-10 mr-3 text-red-500" />
        Error Monitoring
      </h2>

      {/* Error Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ErrorSummaryCard
          icon={XCircle}
          title="Total Errors"
          value={errorData.totalErrors}
          color="bg-red-500"
          isDarkMode={isDarkMode}
        />
        <ErrorSummaryCard
          icon={AlertOctagon}
          title="Unique Errors"
          value={errorData.uniqueErrors}
          color="bg-red-400"
          isDarkMode={isDarkMode}
        />
        <ErrorSummaryCard
          icon={AlertCircle}
          title="Critical Errors"
          value={errorData.criticalErrors}
          color="bg-red-600"
          isDarkMode={isDarkMode}
        />
        <ErrorSummaryCard
          icon={CheckCircle}
          title="Resolved Errors"
          value={errorData.resolvedErrors}
          color="bg-red-300"
          isDarkMode={isDarkMode}
        />
      </div>

      {/* Error Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ErrorChart
          title="Error Types"
          icon={PieChart}
          data={errorData.errorTypes}
          isDarkMode={isDarkMode}
          colors={redColorPalette}
        />
        <ErrorChart
          title="Error Sources"
          icon={TrendingUp}
          data={errorData.errorSources.map(item => ({ name: item.source, value: item.count }))}
          isDarkMode={isDarkMode}
          colors={redColorPalette}
        />
      </div>

      {/* Recent Errors Table */}
      <Card className={isDarkMode ? 'bg-gray-800' : ''}>
        <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Recent Errors</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className={isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} divide-y divide-gray-200`}>
              {errorData.recentErrors.map((error) => (
                <tr key={error.id}>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>{error.type}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>{error.message}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>{error.timestamp}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      error.status === 'Open' ? 'bg-red-100 text-red-800' :
                      error.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {error.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

const ErrorSummaryCard = ({ icon: Icon, title, value, color, isDarkMode }) => (
  <Card className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} overflow-hidden`}>
    <div className="p-5">
      <div className="flex items-center">
        <div className={`rounded-md p-3 ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="ml-5">
          <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{title}</p>
          <p className={`mt-1 text-3xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{value}</p>
        </div>
      </div>
    </div>
  </Card>
);

const ErrorChart = ({ title, data, isDarkMode, type = 'pie' }) => (
  <Card className={isDarkMode ? 'bg-gray-800' : ''}>
    <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>{title}</h3>
    <ResponsiveContainer width="100%" height={300}>
    {type === 'pie' ? (
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={60}
            paddingAngle={5}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={redColorPalette[index % redColorPalette.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{
              backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
              border: 'none',
              borderRadius: '0.375rem',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              fontFamily: 'Inter, sans-serif',
            }}
            itemStyle={{ color: isDarkMode ? '#e5e7eb' : '#374151' }}
          />
          <Legend />
        </PieChart>
      )  : (
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="errors" stroke="#8884d8" />
        </LineChart>
      )}
    </ResponsiveContainer>
  </Card>
);

const ConversationsTab = ({ isDarkMode, mockData, selectedConversation, setSelectedConversation }) => {
  return (
    <div className="space-y-8">
      <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-6 flex items-center`}>
        <MessageCircle className="w-10 h-10 mr-3 text-blue-500" />
        Recent Conversations
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className={`lg:col-span-1 ${isDarkMode ? 'bg-gray-800' : ''}`}>
          <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Conversation List</h3>
          <div className="space-y-4">
            {mockData.conversations.map((conversation) => (
              <motion.div
                key={conversation.id}
                className={`p-4 rounded-lg cursor-pointer ${
                  selectedConversation?.id === conversation.id
                    ? isDarkMode ? 'bg-indigo-900' : 'bg-indigo-100'
                    : isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-50'
                }`}
                onClick={() => setSelectedConversation(conversation)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex justify-between items-center">
                  <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{conversation.user}</span>
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{conversation.time}</span>
                </div>
                <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{conversation.lastMessage}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    conversation.status === 'active'
                      ? isDarkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'
                      : conversation.status === 'pending'
                      ? isDarkMode ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800'
                      : isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {conversation.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
        <Card className={`lg:col-span-2 ${isDarkMode ? 'bg-gray-800' : ''}`}>
          <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Conversation Details</h3>
          {selectedConversation ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h4 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{selectedConversation.user}</h4>
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{selectedConversation.time}</span>
              </div>
              <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <p className={isDarkMode ? 'text-white' : 'text-gray-800'}>{selectedConversation.lastMessage}</p>
              </div>
              <div className="mt-4 flex space-x-2">
                <Button>
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Reply
                </Button>
                <Button className={isDarkMode ? 'bg-green-700 hover:bg-green-600' : 'bg-green-500 hover:bg-green-400'}>
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
                <Button className={isDarkMode ? 'bg-red-700 hover:bg-red-600' : 'bg-red-500 hover:bg-red-400'}>
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Mark as Urgent
                </Button>
              </div>
            </div>
          ) : (
            <div className={`flex flex-col items-center justify-center h-64 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <MessageCircle className="w-16 h-16 mb-4" />
              <p>Select a conversation to view details</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

const AudioTranscriptsTab = ({ isDarkMode, mockData, handleAudioPlay }) => {
  // Dummy data for Sentiment Analysis
  const sentimentData = [
    { sentiment: 'Positive', percentage: 60 },
    { sentiment: 'Neutral', percentage: 25 },
    { sentiment: 'Negative', percentage: 15 },
  ];

  // Dummy data for Most Common Topics
  const commonTopics = [
    { topic: 'Weather Forecast', count: 120 },
    { topic: 'Crop Prices', count: 90 },
    { topic: 'Farming Techniques', count: 75 },
    { topic: 'Government Schemes', count: 60 },
    { topic: 'Pest Control', count: 50 },
  ];

  // Dummy data for Transcript Length Distribution
  const lengthDistribution = [
    { range: '0-50 words', count: 30 },
    { range: '51-100 words', count: 50 },
    { range: '101-150 words', count: 40 },
    { range: '151-200 words', count: 20 },
    { range: '201+ words', count: 10 },
  ];

  // Dummy data for Language Distribution
  const languageData = [
    { language: 'Hindi', percentage: 70 },
    { language: 'English', percentage: 20 },
    { language: 'Bengali', percentage: 5 },
    { language: 'Tamil', percentage: 3 },
    { language: 'Telugu', percentage: 2 },
  ];
  // Additional KPIs
  const totalDuration = mockData.audioTranscripts.reduce((acc, transcript) => acc + transcript.duration, 0);
  const averageDuration = (totalDuration / mockData.audioTranscripts.length).toFixed(2);
  const totalSpeakers = new Set(mockData.audioTranscripts.map(transcript => transcript.speaker)).size;

  // Colors for the pie charts
  const COLORS = ['#1E3A8A', '#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE'];

  return (
    <div className="space-y-8">
      <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-6 flex items-center`}>
        <Mic className="w-10 h-10 mr-3 text-blue-500" />
        Audio Transcripts
      </h2>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* Total Transcripts Processed */}
  <div className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} flex items-center`}>
    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-green-600' : 'bg-green-200'} mr-4`}>
      <TrendingUp className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-green-600'}`} />
    </div>
    <div>
      <p className="text-sm text-gray-500">Total Transcripts</p>
      <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{mockData.audioTranscripts.length}</p>
    </div>
  </div>

  {/* Total Duration */}
  <div className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} flex items-center`}>
    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-blue-600' : 'bg-blue-200'} mr-4`}>
      <Clock className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-blue-600'}`} />
    </div>
    <div>
      <p className="text-sm text-gray-500">Total Duration (mins)</p>
      <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{totalDuration}</p>
    </div>
  </div>

  {/* Average Duration */}
  <div className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} flex items-center`}>
    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-purple-600' : 'bg-purple-200'} mr-4`}>
      <Clock className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-purple-600'}`} />
    </div>
    <div>
      <p className="text-sm text-gray-500">Average Duration (mins)</p>
      <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{averageDuration}</p>
    </div>
  </div>

  {/* Total Speakers */}
  <div className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} flex items-center`}>
    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-yellow-600' : 'bg-yellow-200'} mr-4`}>
      <Users className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-yellow-600'}`} />
    </div>
    <div>
      <p className="text-sm text-gray-500">Total Speakers</p>
      <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{totalSpeakers}</p>
    </div>
  </div>
</div>

      {/* Detailed Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sentiment Analysis */}
        <Card isDarkMode={isDarkMode}>
        <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-6 flex items-center`}>
            <ThumbsUp className="w-8 h-8 mr-3 text-blue-500" />
            Sentiment Analysis
          </h3>
            <ResponsiveContainer width="100%" height={250}>
            <RePieChart>
              <Pie
                data={sentimentData}
                dataKey="percentage"
                nameKey="sentiment"
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                label
              >
                {sentimentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                  border: 'none',
                }}
                itemStyle={{ color: isDarkMode ? '#e5e7eb' : '#374151' }}
              />
              <Legend />
            </RePieChart>
          </ResponsiveContainer>
        </Card>

        {/* Language Distribution */}
       <Card isDarkMode={isDarkMode}>
       <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-6 flex items-center`}>
            <Globe className="w-8 h-8 mr-3 text-blue-500" />
            Language Distribution
          </h3>
                    <ResponsiveContainer width="100%" height={250}>
            <BarChart data={languageData}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
              <XAxis dataKey="language" stroke={isDarkMode ? '#9ca3af' : '#6b7280'} />
              <YAxis stroke={isDarkMode ? '#9ca3af' : '#6b7280'} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                  border: 'none',
                }}
                itemStyle={{ color: isDarkMode ? '#e5e7eb' : '#374151' }}
              />
              <Bar dataKey="percentage" fill={COLORS[1]} /> {/* Changed to use the second blue shade */}
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Most Common Topics */}
        <Card isDarkMode={isDarkMode}>
        <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-6 flex items-center`}>
            <Tag className="w-8 h-8 mr-3 text-blue-500" />
            Most Common Topics
          </h3>
                    <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={commonTopics}
                dataKey="count"
                nameKey="topic"
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                label
              >
                {commonTopics.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                  border: 'none',
                }}
                itemStyle={{ color: isDarkMode ? '#e5e7eb' : '#374151' }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Transcript Length Distribution */}
        <Card isDarkMode={isDarkMode}>
        <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-6 flex items-center`}>
            <BarChart2 className="w-8 h-8 mr-3 text-blue-500" />
            Transcript Length Distribution
          </h3>
                    <ResponsiveContainer width="100%" height={250}>
            <BarChart data={lengthDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
              <XAxis dataKey="range" stroke={isDarkMode ? '#9ca3af' : '#6b7280'} />
              <YAxis stroke={isDarkMode ? '#9ca3af' : '#6b7280'} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                  border: 'none',
                }}
                itemStyle={{ color: isDarkMode ? '#e5e7eb' : '#374151' }}
              />
              <Bar dataKey="count" fill={COLORS[2]} /> {/* Changed to use the third blue shade */}
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};

const MetricCard = ({ icon: Icon, title, value, color }) => (
  <Card className="flex items-center space-x-4">
    <div className={`rounded-full p-3 ${color}`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div>
      <p className="text-sm font-medium text-gray-600">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </Card>
);

const ChartCard = ({ title, children }) => (
  <Card className="col-span-1 md:col-span-2 lg:col-span-1">
    <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
    {children}
  </Card>
);

const KnowledgeBaseTab = ({ mockData }) => {
  const COLORS = ['#34D399', '#10B981', '#059669', '#047857'];

  return (
    <div className="space-y-8 p-6 font-sans">
<h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <PieChart className="w-8 h-8 mr-3 text-blue-500" />
            Knowledge Base Statistics
          </h3>      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          icon={Database}
          title="Knowledge Base Health"
          value={`${mockData.dynamoDBHealth}%`}
          color="bg-emerald-500"
        />
        <MetricCard
          icon={Globe}
          title="Most Accessed Language"
          value={mockData.languageStats[0].name}
          color="bg-blue-500"
        />
        <MetricCard
          icon={Star}
          title="User Satisfaction"
          value="85%"
          color="bg-yellow-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ChartCard title={
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <PieChart className="w-8 h-8 mr-3 text-blue-500" />
            Knowledge Base Statistics
          </h3>
        }>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={mockData.knowledgeBaseStats}
                dataKey="articles"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={60}
                paddingAngle={5}
              >
                {mockData.knowledgeBaseStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: 'none',
                  fontFamily: 'Inter, sans-serif',
                }}
                itemStyle={{ color: '#374151' }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title={
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <TrendingUp className="w-8 h-8 mr-3 text-blue-500" />
            Top Queried Topics
          </h3>
        }>
          <div className="space-y-4">
            {mockData.knowledgeBaseStats.map((topic, index) => (
              <div key={index} className="flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                  <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: `${(topic.queries / Math.max(...mockData.knowledgeBaseStats.map(t => t.queries))) * 100}%` }}></div>
                </div>
                <span className="text-sm font-medium text-gray-700 w-32">{topic.name}</span>
                <span className="text-sm font-semibold text-gray-900">{topic.queries}</span>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title={
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Star className="w-8 h-8 mr-3 text-blue-500" />
            User Satisfaction Ratings
          </h3>
        }>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[
              { rating: '5 Stars', count: 300 },
              { rating: '4 Stars', count: 150 },
              { rating: '3 Stars', count: 50 },
              { rating: '2 Stars', count: 20 },
              { rating: '1 Star', count: 10 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="rating" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: 'none',
                  fontFamily: 'Inter, sans-serif',
                }}
                itemStyle={{ color: '#374151' }}
              />
              <Bar dataKey="count" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title={
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Layers className="w-8 h-8 mr-3 text-blue-500" />
            Knowledge Base Coverage
          </h3>
        }>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[
              { category: 'Agriculture', percentage: 40 },
              { category: 'Weather', percentage: 20 },
              { category: 'Market Prices', percentage: 25 },
              { category: 'Pest Control', percentage: 10 },
              { category: 'Gov Schemes', percentage: 5 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="category" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: 'none',
                  fontFamily: 'Inter, sans-serif',
                }}
                itemStyle={{ color: '#374151' }}
              />
              <Bar dataKey="percentage" fill="#059669" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
};
const getGradientColor = (change) => {
  return change.startsWith('+') 
    ? 'bg-gradient-to-r from-green-400 to-blue-500'
    : 'bg-gradient-to-r from-red-400 to-pink-500';
};

const getChangeColor = (change) => {
  return change.startsWith('+')
    ? 'bg-green-100 text-green-800'
    : 'bg-red-100 text-red-800';
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default Dashboard;