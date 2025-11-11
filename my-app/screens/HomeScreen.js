import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated, Modal, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function HomeScreen({ onLogout }) {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [xpAnimation] = useState(new Animated.Value(0));
  const [selectedQuest, setSelectedQuest] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [statsModalVisible, setStatsModalVisible] = useState(false);
  const [logModalVisible, setLogModalVisible] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskXP, setTaskXP] = useState('');

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.timing(xpAnimation, {
      toValue: 0.75, // 75% XP progress
      duration: 2000,
      useNativeDriver: false,
    }).start();
  }, []);

  const playerStats = {
    level: 12,
    xp: 750,
    maxXp: 1000,
    streak: 7,
    name: "Shadow Monarch"
  };

  const dailyQuests = [
    { id: 1, title: "Study", description: "Complete 2 hours of focused learning", reward: "50 XP", completed: true },
    { id: 2, title: "Workout", description: "Exercise for 30 minutes", reward: "30 XP", completed: false },
    { id: 3, title: "Meditate", description: "10 minutes of mindfulness", reward: "20 XP", completed: false },
    { id: 4, title: "Serve Kisha Alcohol", description: "Provide beverage service to Kisha", reward: "25 XP", completed: true },
  ];

  const handleQuestPress = (quest) => {
    setSelectedQuest(quest);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedQuest(null);
  };

  const toggleQuestCompletion = () => {
    if (selectedQuest) {
      // Update quest completion status
      const updatedQuests = dailyQuests.map(quest => 
        quest.id === selectedQuest.id 
          ? { ...quest, completed: !quest.completed }
          : quest
      );
      setSelectedQuest({ ...selectedQuest, completed: !selectedQuest.completed });
    }
  };

  const handleStatsPress = () => {
    setStatsModalVisible(true);
  };

  const closeStatsModal = () => {
    setStatsModalVisible(false);
  };

  const handleLogPress = () => {
    setLogModalVisible(true);
  };

  const closeLogModal = () => {
    setLogModalVisible(false);
    setTaskTitle('');
    setTaskDescription('');
    setTaskXP('');
  };

  const handleLogTask = () => {
    // Here you would typically save the task to your data store
    console.log('Logging task:', { taskTitle, taskDescription, taskXP });
    
    // Show success feedback
    alert(`Task "${taskTitle}" logged successfully! +${taskXP} XP`);
    
    closeLogModal();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Feather name="settings" size={20} color="#888" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <View style={styles.titleWrapper}>
            <View style={styles.titleBackground} />
            <Text style={styles.appTitle}>LVL</Text>
            <View style={styles.titleAccent}>
              <Text style={styles.appTitleAccent}>UP</Text>
              <View style={styles.glowDot} />
            </View>
          </View>
          <View style={styles.headerStats}>
            <View style={styles.quickStat}>
              <Feather name="zap" size={14} color="#00d4ff" />
              <Text style={styles.quickStatText}>750 XP</Text>
            </View>
            <View style={styles.quickStat}>
              <Feather name="trending-up" size={14} color="#7c3aed" />
              <Text style={styles.quickStatText}>LVL 12</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Feather name="bell" size={20} color="#888" />
          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          {/* Player Stats Section */}
          <TouchableOpacity
            style={styles.playerStatsCard}
            onPress={handleStatsPress}
            activeOpacity={0.8}
          >
            <Text style={styles.sectionTitle}>⚡ Player Stats</Text>
            <View style={styles.playerInfo}>
              <Text style={styles.playerName}>{playerStats.name}</Text>
              <View style={styles.levelBadge}>
                <Text style={styles.levelText}>LVL {playerStats.level}</Text>
              </View>
            </View>
            
            {/* XP Bar */}
            <View style={styles.xpContainer}>
              <Text style={styles.xpLabel}>Experience Points</Text>
              <View style={styles.xpBarBackground}>
                <Animated.View 
                  style={[
                    styles.xpBarFill,
                    {
                      width: xpAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0%', `${(playerStats.xp / playerStats.maxXp) * 100}%`]
                      })
                    }
                  ]} 
                />
              </View>
              <Text style={styles.xpText}>{playerStats.xp} / {playerStats.maxXp} XP</Text>
            </View>

            {/* Daily Streak */}
            <View style={styles.streakContainer}>
              <Text style={styles.streakLabel}>🔥 Daily Streak</Text>
              <Text style={styles.streakNumber}>{playerStats.streak} days</Text>
            </View>
          </TouchableOpacity>

          {/* Daily Quests Section */}
          <View style={styles.questsCard}>
            <Text style={styles.sectionTitle}>📋 Daily Quests</Text>
            {dailyQuests.map((quest) => (
              <TouchableOpacity
                key={quest.id}
                style={[
                  styles.questItem,
                  quest.completed && styles.questCompleted
                ]}
                onPress={() => handleQuestPress(quest)}
                activeOpacity={0.8}
              >
                <View style={styles.questInfo}>
                  <View style={styles.questHeader}>
                    <Text style={[styles.questTitle, quest.completed && styles.completedText]}>
                      {quest.completed ? '✅' : '⭕'} {quest.title}
                    </Text>
                    <Text style={styles.questReward}>{quest.reward}</Text>
                  </View>
                  <Text style={[styles.questDescription, quest.completed && styles.completedText]}>
                    {quest.description}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
          <Feather name="home" size={22} color="#00d4ff" />
          <Text style={[styles.navLabel, styles.activeNavLabel]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={handleLogPress}>
          <Feather name="plus-circle" size={22} color="#888" />
          <Text style={styles.navLabel}>Log</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Feather name="package" size={22} color="#888" />
          <Text style={styles.navLabel}>Inventory</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Feather name="user" size={22} color="#888" />
          <Text style={styles.navLabel}>Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Quest Detail Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedQuest && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{selectedQuest.title}</Text>
                  <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                    <Feather name="x" size={24} color="#888" />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.questStatusContainer}>
                  <View style={[styles.statusBadge, selectedQuest.completed && styles.completedBadge]}>
                    <Text style={styles.statusText}>
                      {selectedQuest.completed ? 'Completed' : 'In Progress'}
                    </Text>
                  </View>
                  <Text style={styles.rewardText}>Reward: {selectedQuest.reward}</Text>
                </View>

                <Text style={styles.modalDescription}>
                  {selectedQuest.description}
                </Text>

                <View style={styles.questDetails}>
                  <Text style={styles.detailLabel}>Category:</Text>
                  <Text style={styles.detailValue}>Personal Development</Text>
                  
                  <Text style={styles.detailLabel}>Difficulty:</Text>
                  <Text style={styles.detailValue}>Medium</Text>
                  
                  <Text style={styles.detailLabel}>Time Required:</Text>
                  <Text style={styles.detailValue}>30-60 minutes</Text>
                </View>

                <View style={styles.modalActions}>
                  <TouchableOpacity 
                    style={[styles.actionButton, selectedQuest.completed && styles.unmarkButton]}
                    onPress={toggleQuestCompletion}
                  >
                    <Feather 
                      name={selectedQuest.completed ? "x-circle" : "check-circle"} 
                      size={20} 
                      color="#fff" 
                    />
                    <Text style={styles.actionButtonText}>
                      {selectedQuest.completed ? 'Mark Incomplete' : 'Mark Complete'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Player Stats Detail Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={statsModalVisible}
        onRequestClose={closeStatsModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Player Profile</Text>
              <TouchableOpacity onPress={closeStatsModal} style={styles.closeButton}>
                <Feather name="x" size={24} color="#888" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.profileSection}>
              <View style={styles.profileAvatar}>
                <Text style={styles.avatarText}>SM</Text>
              </View>
              <Text style={styles.profileName}>{playerStats.name}</Text>
              <Text style={styles.profileTitle}>Shadow Hunter</Text>
            </View>

            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Feather name="zap" size={20} color="#00d4ff" />
                <Text style={styles.statLabel}>Current XP</Text>
                <Text style={styles.statValue}>{playerStats.xp}</Text>
              </View>
              
              <View style={styles.statItem}>
                <Feather name="trending-up" size={20} color="#7c3aed" />
                <Text style={styles.statLabel}>Level</Text>
                <Text style={styles.statValue}>{playerStats.level}</Text>
              </View>
              
              <View style={styles.statItem}>
                <Feather name="target" size={20} color="#4ade80" />
                <Text style={styles.statLabel}>Next Level</Text>
                <Text style={styles.statValue}>{playerStats.maxXp - playerStats.xp} XP</Text>
              </View>
              
              <View style={styles.statItem}>
                <Feather name="calendar" size={20} color="#ff6b35" />
                <Text style={styles.statLabel}>Streak</Text>
                <Text style={styles.statValue}>{playerStats.streak} days</Text>
              </View>
            </View>

            <View style={styles.achievementsSection}>
              <Text style={styles.achievementsTitle}>🏆 Recent Achievements</Text>
              <View style={styles.achievementItem}>
                <Text style={styles.achievementName}>Week Warrior</Text>
                <Text style={styles.achievementDesc}>Complete 7 day streak</Text>
              </View>
              <View style={styles.achievementItem}>
                <Text style={styles.achievementName}>Knowledge Seeker</Text>
                <Text style={styles.achievementDesc}>Complete 10 study sessions</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* Manual Task Log Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={logModalVisible}
        onRequestClose={closeLogModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Log New Task</Text>
              <TouchableOpacity onPress={closeLogModal} style={styles.closeButton}>
                <Feather name="x" size={24} color="#888" />
              </TouchableOpacity>
            </View>
            
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.formSection}>
                <Text style={styles.formLabel}>Task Title</Text>
                <TextInput
                  style={styles.formInput}
                  value={taskTitle}
                  onChangeText={setTaskTitle}
                  placeholder="Enter task name..."
                  placeholderTextColor="#888"
                />
              </View>

              <View style={styles.formSection}>
                <Text style={styles.formLabel}>Description</Text>
                <TextInput
                  style={[styles.formInput, styles.textArea]}
                  value={taskDescription}
                  onChangeText={setTaskDescription}
                  placeholder="Describe what you accomplished..."
                  placeholderTextColor="#888"
                  multiline
                  numberOfLines={4}
                />
              </View>

              <View style={styles.formSection}>
                <Text style={styles.formLabel}>XP Reward</Text>
                <TextInput
                  style={styles.formInput}
                  value={taskXP}
                  onChangeText={setTaskXP}
                  placeholder="Enter XP amount (e.g., 25)"
                  placeholderTextColor="#888"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.quickXPButtons}>
                <Text style={styles.quickXPLabel}>Quick XP:</Text>
                <View style={styles.xpButtonRow}>
                  <TouchableOpacity 
                    style={styles.quickXPButton} 
                    onPress={() => setTaskXP('10')}
                  >
                    <Text style={styles.quickXPButtonText}>10 XP</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.quickXPButton} 
                    onPress={() => setTaskXP('25')}
                  >
                    <Text style={styles.quickXPButtonText}>25 XP</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.quickXPButton} 
                    onPress={() => setTaskXP('50')}
                  >
                    <Text style={styles.quickXPButtonText}>50 XP</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>

            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={[styles.actionButton, (!taskTitle || !taskXP) && styles.disabledButton]}
                onPress={handleLogTask}
                disabled={!taskTitle || !taskXP}
              >
                <Feather name="check" size={20} color="#fff" />
                <Text style={styles.actionButtonText}>Log Task</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    shadowColor: '#00d4ff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  titleContainer: {
    alignItems: 'center',
  },
  titleWrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  titleBackground: {
    position: 'absolute',
    left: -10,
    right: -10,
    top: -5,
    bottom: -5,
    backgroundColor: 'rgba(0, 212, 255, 0.05)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 255, 0.1)',
  },
  appTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 2,
    zIndex: 1,
  },
  titleAccent: {
    position: 'relative',
    marginLeft: 2,
    zIndex: 1,
  },
  appTitleAccent: {
    fontSize: 28,
    fontWeight: '900',
    color: '#00d4ff',
    textShadowColor: '#00d4ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
    letterSpacing: 2,
  },
  glowDot: {
    position: 'absolute',
    top: -2,
    right: -8,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#7c3aed',
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  headerStats: {
    flexDirection: 'row',
    gap: 15,
  },
  quickStat: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  quickStatText: {
    color: '#ccc',
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 4,
  },
  logoutButton: {
    padding: 8,
  },
  placeholder: {
    width: 36,
  },
  scrollContainer: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  playerStatsCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#16213e',
    shadowColor: '#00d4ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00d4ff',
    marginBottom: 15,
    textShadowColor: '#0088cc',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  playerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  playerName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  levelBadge: {
    backgroundColor: '#7c3aed',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  levelText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  xpContainer: {
    marginBottom: 15,
  },
  xpLabel: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 8,
  },
  xpBarBackground: {
    height: 10,
    backgroundColor: '#333',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 5,
  },
  xpBarFill: {
    height: '100%',
    backgroundColor: '#00d4ff',
    borderRadius: 5,
    shadowColor: '#00d4ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  xpText: {
    color: '#ccc',
    fontSize: 12,
    textAlign: 'right',
  },
  streakContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  streakLabel: {
    color: '#ff6b35',
    fontSize: 16,
    fontWeight: '600',
  },
  streakNumber: {
    color: '#ff6b35',
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: '#ff6b35',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  questsCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: '#16213e',
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  questItem: {
    backgroundColor: '#16213e',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#00d4ff',
  },
  questCompleted: {
    backgroundColor: '#1a2e1a',
    borderLeftColor: '#4ade80',
    opacity: 0.8,
  },
  questHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  questTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  questReward: {
    color: '#00d4ff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  questDescription: {
    color: '#ccc',
    fontSize: 14,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    paddingTop: 10,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 5,
  },
  activeNavItem: {
    backgroundColor: 'rgba(0, 212, 255, 0.1)',
    borderRadius: 15,
    marginHorizontal: 5,
  },
  navLabel: {
    color: '#888',
    fontSize: 12,
    fontWeight: '500',
  },
  activeNavLabel: {
    color: '#00d4ff',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#1a1a2e',
    borderRadius: 20,
    padding: 25,
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: '#16213e',
    shadowColor: '#00d4ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00d4ff',
    textShadowColor: '#0088cc',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  closeButton: {
    padding: 5,
  },
  questStatusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusBadge: {
    backgroundColor: '#7c3aed',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  completedBadge: {
    backgroundColor: '#4ade80',
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  rewardText: {
    color: '#00d4ff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalDescription: {
    color: '#ccc',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 25,
  },
  questDetails: {
    backgroundColor: '#16213e',
    borderRadius: 10,
    padding: 15,
    marginBottom: 25,
  },
  detailLabel: {
    color: '#888',
    fontSize: 14,
    marginTop: 8,
    marginBottom: 2,
  },
  detailValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  actionButton: {
    backgroundColor: '#4ade80',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: '#4ade80',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  unmarkButton: {
    backgroundColor: '#ff6b35',
    shadowColor: '#ff6b35',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 25,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#7c3aed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
  },
  avatarText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  profileName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileTitle: {
    color: '#00d4ff',
    fontSize: 16,
    fontStyle: 'italic',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  statItem: {
    width: '48%',
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 255, 0.2)',
  },
  statLabel: {
    color: '#888',
    fontSize: 12,
    marginTop: 8,
    marginBottom: 4,
  },
  statValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  achievementsSection: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 15,
  },
  achievementsTitle: {
    color: '#00d4ff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  achievementItem: {
    marginBottom: 12,
  },
  achievementName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  achievementDesc: {
    color: '#888',
    fontSize: 12,
  },
  formSection: {
    marginBottom: 20,
  },
  formLabel: {
    color: '#00d4ff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  formInput: {
    backgroundColor: '#16213e',
    borderRadius: 10,
    padding: 15,
    color: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 255, 0.2)',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  quickXPButtons: {
    marginBottom: 20,
  },
  quickXPLabel: {
    color: '#888',
    fontSize: 14,
    marginBottom: 10,
  },
  xpButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickXPButton: {
    backgroundColor: '#7c3aed',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  quickXPButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  disabledButton: {
    backgroundColor: '#333',
    shadowOpacity: 0,
  },
});
