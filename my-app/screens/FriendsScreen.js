import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated, Modal, TextInput, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function FriendsScreen({ onBack }) {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [addFriendModalVisible, setAddFriendModalVisible] = useState(false);
  const [createGuildModalVisible, setCreateGuildModalVisible] = useState(false);
  const [friendCode, setFriendCode] = useState('');
  const [guildName, setGuildName] = useState('');
  const [guildDescription, setGuildDescription] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('friends'); // 'friends', 'requests', 'guilds'

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const friends = [
    { id: 1, name: "Iron Monarch", level: 15, status: "online", avatar: "IM", lastSeen: "Now" },
    { id: 2, name: "Beast Hunter", level: 12, status: "offline", avatar: "BH", lastSeen: "2 hours ago" },
    { id: 3, name: "Shadow Walker", level: 18, status: "online", avatar: "SW", lastSeen: "Now" },
    { id: 4, name: "Light Bearer", level: 10, status: "away", avatar: "LB", lastSeen: "30 min ago" },
  ];

  const friendRequests = [
    { id: 1, name: "Dark Slayer", level: 14, avatar: "DS", mutualFriends: 2 },
    { id: 2, name: "Fire Mage", level: 11, avatar: "FM", mutualFriends: 0 },
  ];

  const guilds = [
    { 
      id: 1, 
      name: "Shadow Raiders", 
      members: 12, 
      maxMembers: 20, 
      level: 25, 
      role: "Leader",
      description: "Elite hunters focused on daily challenges",
      weeklyGoal: "Complete 50 quests collectively",
      progress: 32,
      maxProgress: 50,
      rank: 3
    },
    { 
      id: 2, 
      name: "Iron Legion", 
      members: 8, 
      maxMembers: 15, 
      level: 18, 
      role: "Member",
      description: "Fitness and strength focused guild",
      weeklyGoal: "Accumulate 1000 workout XP",
      progress: 650,
      maxProgress: 1000,
      rank: 7
    },
  ];

  const availableGuilds = [
    { 
      id: 3, 
      name: "Code Warriors", 
      members: 15, 
      maxMembers: 25, 
      level: 22, 
      description: "Programming and tech skill development",
      requirements: "Level 10+",
      isOpen: true
    },
    { 
      id: 4, 
      name: "Mindful Masters", 
      members: 6, 
      maxMembers: 10, 
      level: 16, 
      description: "Meditation and wellness focused",
      requirements: "Complete 5 meditation quests",
      isOpen: false
    },
  ];

  const handleAddFriend = () => {
    console.log('Adding friend with code:', friendCode);
    setAddFriendModalVisible(false);
    setFriendCode('');
  };

  const handleCreateGuild = () => {
    console.log('Creating guild:', { guildName, guildDescription });
    setCreateGuildModalVisible(false);
    setGuildName('');
    setGuildDescription('');
  };

  const renderFriendItem = ({ item }) => (
    <TouchableOpacity style={styles.friendItem}>
      <View style={[styles.avatar, { backgroundColor: getAvatarColor(item.status) }]}>
        <Text style={styles.avatarText}>{item.avatar}</Text>
        <View style={[styles.statusDot, { backgroundColor: getStatusColor(item.status) }]} />
      </View>
      <View style={styles.friendInfo}>
        <Text style={styles.friendName}>{item.name}</Text>
        <Text style={styles.friendLevel}>Level {item.level}</Text>
        <Text style={styles.lastSeen}>{item.lastSeen}</Text>
      </View>
      <TouchableOpacity style={styles.friendAction}>
        <Feather name="message-circle" size={20} color="#00d4ff" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderRequestItem = ({ item }) => (
    <View style={styles.requestItem}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.avatar}</Text>
      </View>
      <View style={styles.friendInfo}>
        <Text style={styles.friendName}>{item.name}</Text>
        <Text style={styles.friendLevel}>Level {item.level}</Text>
        <Text style={styles.mutualFriends}>{item.mutualFriends} mutual friends</Text>
      </View>
      <View style={styles.requestActions}>
        <TouchableOpacity style={styles.acceptButton}>
          <Feather name="check" size={16} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.declineButton}>
          <Feather name="x" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderGuildItem = ({ item }) => (
    <TouchableOpacity style={styles.guildItem}>
      <View style={styles.guildHeader}>
        <View style={styles.guildMainInfo}>
          <Text style={styles.guildName}>{item.name}</Text>
          <Text style={styles.guildDescription}>{item.description}</Text>
          <View style={styles.guildStats}>
            <Text style={styles.guildMembers}>
              <Feather name="users" size={12} color="#888" /> {item.members}/{item.maxMembers}
            </Text>
            <Text style={styles.guildLevel}>
              <Feather name="shield" size={12} color="#7c3aed" /> Level {item.level}
            </Text>
            {item.role && (
              <View style={[styles.roleBadge, { backgroundColor: item.role === 'Leader' ? '#ff6b35' : '#4ade80' }]}>
                <Text style={styles.roleText}>{item.role}</Text>
              </View>
            )}
          </View>
        </View>
        {item.rank && (
          <View style={styles.rankContainer}>
            <Text style={styles.rankLabel}>Rank</Text>
            <Text style={styles.rankNumber}>#{item.rank}</Text>
          </View>
        )}
      </View>
      
      {item.weeklyGoal && (
        <View style={styles.guildGoal}>
          <Text style={styles.goalTitle}>Weekly Challenge</Text>
          <Text style={styles.goalDescription}>{item.weeklyGoal}</Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[styles.progressFill, { 
                  width: `${(item.progress / item.maxProgress) * 100}%` 
                }]} 
              />
            </View>
            <Text style={styles.progressText}>{item.progress}/{item.maxProgress}</Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderAvailableGuildItem = ({ item }) => (
    <View style={styles.availableGuildItem}>
      <View style={styles.guildMainInfo}>
        <Text style={styles.guildName}>{item.name}</Text>
        <Text style={styles.guildDescription}>{item.description}</Text>
        <View style={styles.guildStats}>
          <Text style={styles.guildMembers}>
            <Feather name="users" size={12} color="#888" /> {item.members}/{item.maxMembers}
          </Text>
          <Text style={styles.guildLevel}>
            <Feather name="shield" size={12} color="#7c3aed" /> Level {item.level}
          </Text>
          <Text style={styles.requirements}>{item.requirements}</Text>
        </View>
      </View>
      <TouchableOpacity 
        style={[styles.joinButton, !item.isOpen && styles.disabledButton]}
        disabled={!item.isOpen}
      >
        <Text style={styles.joinButtonText}>
          {item.isOpen ? 'Request Join' : 'Closed'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const getAvatarColor = (status) => {
    switch (status) {
      case 'online': return '#4ade80';
      case 'away': return '#ff6b35';
      default: return '#7c3aed';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return '#4ade80';
      case 'away': return '#ff6b35';
      default: return '#666';
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Feather name="arrow-left" size={24} color="#888" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Guild Members</Text>
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={() => {
            if (activeTab === 'guilds') {
              setCreateGuildModalVisible(true);
            } else {
              setAddFriendModalVisible(true);
            }
          }}
        >
          <Feather name={activeTab === 'guilds' ? "plus" : "user-plus"} size={24} color="#00d4ff" />
        </TouchableOpacity>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'friends' && styles.activeTab]}
          onPress={() => setActiveTab('friends')}
        >
          <Feather name="users" size={16} color={activeTab === 'friends' ? '#00d4ff' : '#888'} />
          <Text style={[styles.tabText, activeTab === 'friends' && styles.activeTabText]}>
            Friends ({friends.length})
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'requests' && styles.activeTab]}
          onPress={() => setActiveTab('requests')}
        >
          <Feather name="user-check" size={16} color={activeTab === 'requests' ? '#00d4ff' : '#888'} />
          <Text style={[styles.tabText, activeTab === 'requests' && styles.activeTabText]}>
            Requests ({friendRequests.length})
          </Text>
          {friendRequests.length > 0 && <View style={styles.notificationBadge} />}
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tab, activeTab === 'guilds' && styles.activeTab]}
          onPress={() => setActiveTab('guilds')}
        >
          <Feather name="shield" size={16} color={activeTab === 'guilds' ? '#00d4ff' : '#888'} />
          <Text style={[styles.tabText, activeTab === 'guilds' && styles.activeTabText]}>
            Guilds ({guilds.length})
          </Text>
        </TouchableOpacity>
      </View>

      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {activeTab === 'friends' && (
          <FlatList
            data={friends}
            renderItem={renderFriendItem}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        )}

        {activeTab === 'requests' && (
          <FlatList
            data={friendRequests}
            renderItem={renderRequestItem}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Feather name="user-x" size={48} color="#666" />
                <Text style={styles.emptyText}>No friend requests</Text>
              </View>
            }
          />
        )}

        {activeTab === 'guilds' && (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContainer}>
            <Text style={styles.sectionTitle}>My Guilds</Text>
            {guilds.map((guild) => (
              <View key={guild.id}>{renderGuildItem({ item: guild })}</View>
            ))}
            
            <Text style={styles.sectionTitle}>Available Guilds</Text>
            {availableGuilds.map((guild) => (
              <View key={guild.id}>{renderAvailableGuildItem({ item: guild })}</View>
            ))}
          </ScrollView>
        )}
      </Animated.View>

      {/* Add Friend Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={addFriendModalVisible}
        onRequestClose={() => setAddFriendModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Friend</Text>
              <TouchableOpacity 
                onPress={() => setAddFriendModalVisible(false)} 
                style={styles.closeButton}
              >
                <Feather name="x" size={24} color="#888" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.formSection}>
              <Text style={styles.formLabel}>Friend Code</Text>
              <View style={styles.inputContainer}>
                <Feather name="hash" size={18} color="#888" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={friendCode}
                  onChangeText={setFriendCode}
                  placeholder="Enter friend code (e.g., SH#1234)"
                  placeholderTextColor="#666"
                />
              </View>
            </View>

            <View style={styles.yourCodeSection}>
              <Text style={styles.yourCodeLabel}>Your Friend Code</Text>
              <View style={styles.codeContainer}>
                <Text style={styles.codeText}>SM#7891</Text>
                <TouchableOpacity style={styles.copyButton}>
                  <Feather name="copy" size={16} color="#00d4ff" />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity 
              style={[styles.addFriendButton, !friendCode && styles.disabledButton]}
              onPress={handleAddFriend}
              disabled={!friendCode}
            >
              <Feather name="user-plus" size={20} color="#fff" />
              <Text style={styles.addFriendButtonText}>Send Friend Request</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Create Guild Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={createGuildModalVisible}
        onRequestClose={() => setCreateGuildModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Create Guild</Text>
              <TouchableOpacity 
                onPress={() => setCreateGuildModalVisible(false)} 
                style={styles.closeButton}
              >
                <Feather name="x" size={24} color="#888" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.formSection}>
              <Text style={styles.formLabel}>Guild Name</Text>
              <View style={styles.inputContainer}>
                <Feather name="shield" size={18} color="#888" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={guildName}
                  onChangeText={setGuildName}
                  placeholder="Enter guild name"
                  placeholderTextColor="#666"
                />
              </View>
            </View>

            <View style={styles.formSection}>
              <Text style={styles.formLabel}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={guildDescription}
                onChangeText={setGuildDescription}
                placeholder="Describe your guild's goals and focus..."
                placeholderTextColor="#666"
                multiline
                numberOfLines={3}
              />
            </View>

            <TouchableOpacity 
              style={[styles.addFriendButton, (!guildName || !guildDescription) && styles.disabledButton]}
              onPress={handleCreateGuild}
              disabled={!guildName || !guildDescription}
            >
              <Feather name="plus" size={20} color="#fff" />
              <Text style={styles.addFriendButtonText}>Create Guild</Text>
            </TouchableOpacity>
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
  addButton: {
    padding: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 20,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    position: 'relative',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#00d4ff',
  },
  tabText: {
    color: '#888',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  activeTabText: {
    color: '#00d4ff',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: '25%',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff6b35',
  },
  content: {
    flex: 1,
  },
  listContainer: {
    padding: 20,
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#16213e',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#7c3aed',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginRight: 15,
  },
  avatarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#1a1a2e',
  },
  friendInfo: {
    flex: 1,
  },
  friendName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  friendLevel: {
    color: '#00d4ff',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  lastSeen: {
    color: '#888',
    fontSize: 12,
  },
  friendAction: {
    padding: 8,
  },
  requestItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#16213e',
  },
  mutualFriends: {
    color: '#666',
    fontSize: 12,
  },
  requestActions: {
    flexDirection: 'row',
    gap: 10,
  },
  acceptButton: {
    backgroundColor: '#4ade80',
    padding: 8,
    borderRadius: 20,
  },
  declineButton: {
    backgroundColor: '#ff6b35',
    padding: 8,
    borderRadius: 20,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
    marginTop: 15,
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
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00d4ff',
  },
  closeButton: {
    padding: 5,
  },
  formSection: {
    marginBottom: 25,
  },
  formLabel: {
    color: '#00d4ff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16213e',
    borderRadius: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 255, 0.2)',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#fff',
    fontSize: 16,
  },
  yourCodeSection: {
    backgroundColor: '#16213e',
    borderRadius: 10,
    padding: 15,
    marginBottom: 25,
  },
  yourCodeLabel: {
    color: '#888',
    fontSize: 14,
    marginBottom: 8,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  codeText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  copyButton: {
    padding: 8,
  },
  addFriendButton: {
    backgroundColor: '#4ade80',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 12,
  },
  addFriendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  disabledButton: {
    backgroundColor: '#333',
    opacity: 0.5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00d4ff',
    marginBottom: 15,
    marginTop: 10,
  },
  guildItem: {
    backgroundColor: '#1a1a2e',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#16213e',
    borderLeftWidth: 4,
    borderLeftColor: '#7c3aed',
  },
  guildHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  guildMainInfo: {
    flex: 1,
  },
  guildName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  guildDescription: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 10,
    lineHeight: 18,
  },
  guildStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  guildMembers: {
    color: '#888',
    fontSize: 12,
  },
  guildLevel: {
    color: '#7c3aed',
    fontSize: 12,
    fontWeight: '600',
  },
  roleBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  roleText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  rankContainer: {
    alignItems: 'center',
  },
  rankLabel: {
    color: '#888',
    fontSize: 12,
  },
  rankNumber: {
    color: '#00d4ff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  guildGoal: {
    backgroundColor: '#16213e',
    borderRadius: 10,
    padding: 15,
  },
  goalTitle: {
    color: '#00d4ff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },
  goalDescription: {
    color: '#ccc',
    fontSize: 12,
    marginBottom: 10,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#333',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4ade80',
    borderRadius: 3,
  },
  progressText: {
    color: '#888',
    fontSize: 12,
    fontWeight: '600',
  },
  availableGuildItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#16213e',
  },
  requirements: {
    color: '#ff6b35',
    fontSize: 11,
    fontStyle: 'italic',
  },
  joinButton: {
    backgroundColor: '#4ade80',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  textArea: {
    backgroundColor: '#16213e',
    borderRadius: 10,
    padding: 15,
    color: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 255, 0.2)',
    height: 80,
    textAlignVertical: 'top',
  },
});
