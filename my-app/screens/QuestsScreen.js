import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated, Modal } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function QuestsScreen({ onBack }) {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [selectedQuest, setSelectedQuest] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('incomplete'); // 'incomplete', 'completed', 'pending'

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const allQuests = [
    // Incomplete Quests
    { id: 1, title: "Workout", description: "Exercise for 30 minutes", reward: "30 XP", completed: false, status: "incomplete", difficulty: "Medium", category: "Fitness" },
    { id: 2, title: "Meditate", description: "10 minutes of mindfulness", reward: "20 XP", completed: false, status: "incomplete", difficulty: "Easy", category: "Wellness" },
    { id: 3, title: "Learn New Skill", description: "Practice coding for 1 hour", reward: "40 XP", completed: false, status: "incomplete", difficulty: "Hard", category: "Education" },
    
    // Completed Quests
    { id: 4, title: "Study", description: "Complete 2 hours of focused learning", reward: "50 XP", completed: true, status: "completed", difficulty: "Medium", category: "Education", completedAt: "2 hours ago" },
    { id: 5, title: "Serve Kisha Alcohol", description: "Provide beverage service to Kisha", reward: "25 XP", completed: true, status: "completed", difficulty: "Easy", category: "Social", completedAt: "1 day ago" },
    { id: 6, title: "Morning Run", description: "Run 5km in the morning", reward: "35 XP", completed: true, status: "completed", difficulty: "Medium", category: "Fitness", completedAt: "3 days ago" },
    
    // Pending Quests
    { id: 7, title: "Weekly Review", description: "Review and plan next week's goals", reward: "60 XP", completed: false, status: "pending", difficulty: "Medium", category: "Planning", unlockDate: "Tomorrow" },
    { id: 8, title: "Side Project", description: "Work on personal project for 2 hours", reward: "80 XP", completed: false, status: "pending", difficulty: "Hard", category: "Development", unlockDate: "Monday" },
  ];

  const getFilteredQuests = () => {
    return allQuests.filter(quest => quest.status === activeTab);
  };

  const getTabCounts = () => {
    return {
      incomplete: allQuests.filter(q => q.status === 'incomplete').length,
      completed: allQuests.filter(q => q.status === 'completed').length,
      pending: allQuests.filter(q => q.status === 'pending').length,
    };
  };

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
      setSelectedQuest({ ...selectedQuest, completed: !selectedQuest.completed });
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return '#4ade80';
      case 'Medium': return '#ff6b35';
      case 'Hard': return '#ef4444';
      default: return '#888';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Fitness': return 'activity';
      case 'Education': return 'book';
      case 'Wellness': return 'heart';
      case 'Social': return 'users';
      case 'Planning': return 'calendar';
      case 'Development': return 'code';
      default: return 'target';
    }
  };

  const tabCounts = getTabCounts();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Feather name="arrow-left" size={24} color="#888" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Quest Log</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'incomplete' && styles.activeTab]}
          onPress={() => setActiveTab('incomplete')}
        >
          <Feather name="circle" size={18} color={activeTab === 'incomplete' ? '#00d4ff' : '#888'} />
          <Text style={[styles.tabText, activeTab === 'incomplete' && styles.activeTabText]}>
            Active ({tabCounts.incomplete})
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
          onPress={() => setActiveTab('completed')}
        >
          <Feather name="check-circle" size={18} color={activeTab === 'completed' ? '#00d4ff' : '#888'} />
          <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>
            Complete ({tabCounts.completed})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tab, activeTab === 'pending' && styles.activeTab]}
          onPress={() => setActiveTab('pending')}
        >
          <Feather name="clock" size={18} color={activeTab === 'pending' ? '#00d4ff' : '#888'} />
          <Text style={[styles.tabText, activeTab === 'pending' && styles.activeTabText]}>
            Pending ({tabCounts.pending})
          </Text>
        </TouchableOpacity>
      </View>

      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.questsList}>
          {getFilteredQuests().map((quest) => (
            <TouchableOpacity
              key={quest.id}
              style={[
                styles.questCard,
                quest.completed && styles.questCompleted,
                quest.status === 'pending' && styles.questPending
              ]}
              onPress={() => handleQuestPress(quest)}
              activeOpacity={0.8}
            >
              <View style={styles.questHeader}>
                <View style={styles.questTitleRow}>
                  <Feather 
                    name={getCategoryIcon(quest.category)} 
                    size={20} 
                    color="#00d4ff" 
                    style={styles.categoryIcon}
                  />
                  <Text style={[styles.questTitle, quest.completed && styles.completedText]}>
                    {quest.title}
                  </Text>
                  <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(quest.difficulty) }]}>
                    <Text style={styles.difficultyText}>{quest.difficulty}</Text>
                  </View>
                </View>
                <Text style={styles.questReward}>{quest.reward}</Text>
              </View>
              
              <Text style={[styles.questDescription, quest.completed && styles.completedText]}>
                {quest.description}
              </Text>
              
              <View style={styles.questFooter}>
                <Text style={styles.categoryText}>{quest.category}</Text>
                {quest.completedAt && (
                  <Text style={styles.completedTime}>Completed {quest.completedAt}</Text>
                )}
                {quest.unlockDate && (
                  <Text style={styles.unlockDate}>Unlocks {quest.unlockDate}</Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>

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
                  <View style={[
                    styles.statusBadge, 
                    selectedQuest.completed && styles.completedBadge,
                    selectedQuest.status === 'pending' && styles.pendingBadge
                  ]}>
                    <Text style={styles.statusText}>
                      {selectedQuest.status === 'pending' ? 'Pending' : 
                       selectedQuest.completed ? 'Completed' : 'In Progress'}
                    </Text>
                  </View>
                  <Text style={styles.rewardText}>Reward: {selectedQuest.reward}</Text>
                </View>

                <Text style={styles.modalDescription}>
                  {selectedQuest.description}
                </Text>

                <View style={styles.questDetails}>
                  <Text style={styles.detailLabel}>Category:</Text>
                  <Text style={styles.detailValue}>{selectedQuest.category}</Text>
                  
                  <Text style={styles.detailLabel}>Difficulty:</Text>
                  <Text style={styles.detailValue}>{selectedQuest.difficulty}</Text>
                  
                  {selectedQuest.completedAt && (
                    <>
                      <Text style={styles.detailLabel}>Completed:</Text>
                      <Text style={styles.detailValue}>{selectedQuest.completedAt}</Text>
                    </>
                  )}
                  
                  {selectedQuest.unlockDate && (
                    <>
                      <Text style={styles.detailLabel}>Available:</Text>
                      <Text style={styles.detailValue}>{selectedQuest.unlockDate}</Text>
                    </>
                  )}
                </View>

                {selectedQuest.status !== 'pending' && (
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
                )}
              </>
            )}
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
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00d4ff',
    textShadowColor: '#0088cc',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  placeholder: {
    width: 40,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 5,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 5,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#00d4ff',
  },
  tabText: {
    color: '#888',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  activeTabText: {
    color: '#00d4ff',
  },
  content: {
    flex: 1,
  },
  questsList: {
    padding: 20,
  },
  questCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#16213e',
    borderLeftWidth: 4,
    borderLeftColor: '#00d4ff',
  },
  questCompleted: {
    backgroundColor: '#1a2e1a',
    borderLeftColor: '#4ade80',
    opacity: 0.8,
  },
  questPending: {
    backgroundColor: '#2e2e1a',
    borderLeftColor: '#ff6b35',
    opacity: 0.7,
  },
  questHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  questTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryIcon: {
    marginRight: 10,
  },
  questTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 10,
  },
  difficultyText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  questReward: {
    color: '#00d4ff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  questDescription: {
    color: '#ccc',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 15,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  questFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryText: {
    color: '#888',
    fontSize: 12,
    fontStyle: 'italic',
  },
  completedTime: {
    color: '#4ade80',
    fontSize: 12,
  },
  unlockDate: {
    color: '#ff6b35',
    fontSize: 12,
  },
  // Modal styles from existing code
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
  pendingBadge: {
    backgroundColor: '#ff6b35',
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
  },
  unmarkButton: {
    backgroundColor: '#ff6b35',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
