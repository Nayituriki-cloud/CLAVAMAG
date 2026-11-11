import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DisciplineId } from '../types';
import { Users, Heart, MessageSquare, Send, Trophy, Flame, Shield, CheckCircle } from 'lucide-react';

export const CommunityHub: React.FC = () => {
  const { posts, addCommunityPost, user, lang } = useApp();
  const [newPostContent, setNewPostContent] = useState('');
  const [selectedTag, setSelectedTag] = useState<DisciplineId>('krav-maga');
  const [activeTab, setActiveTab] = useState<'feed' | 'challenges' | 'groups'>('feed');
  const [joinedChallengeNotice, setJoinedChallengeNotice] = useState<string | null>(null);

  const challenges = [
    {
      id: 'ch-1',
      title: '30-Day Krav Maga Tactical Stance & Burpee Streak',
      participants: 480,
      reward: 'Tactical Endurance Badge + Certificate Distinction',
      duration: '30 Days',
      joined: true,
    },
    {
      id: 'ch-2',
      title: 'East Africa 100 Sprawls & Heavy Bag Challenge',
      participants: 312,
      reward: 'Fighter Conditioning Honor Roll',
      duration: '14 Days',
      joined: false,
    },
    {
      id: 'ch-3',
      title: 'Women Empowerment 21-Day Situational Awareness Drill',
      participants: 620,
      reward: 'Guardian Certificate Endorsement',
      duration: '21 Days',
      joined: false,
    },
  ];

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;
    addCommunityPost(newPostContent, selectedTag);
    setNewPostContent('');
  };

  const handleJoinChallenge = (title: string) => {
    setJoinedChallengeNotice(`You joined "${title}"! Log your daily rounds in the Fitness tab.`);
    setTimeout(() => setJoinedChallengeNotice(null), 4000);
  };

  return (
    <div className="py-12 bg-neutral-950 text-neutral-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-red-500 uppercase tracking-wider flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>Fighter Brotherhood & Sisterhood</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
            {lang === 'rw' ? 'Umuryango w’Abarwanyi' : lang === 'fr' ? 'Communauté des Combattants' : 'Global Martial Arts Community'}
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl">
            Share training breakthroughs, debate technique counters, celebrate belt advancements, and take on community fitness challenges.
          </p>
        </div>

        {/* Tab Filter */}
        <div className="flex items-center gap-2 border-b border-neutral-800 pb-3 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('feed')}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === 'feed' ? 'bg-red-600 text-white font-bold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Discussions & Feeds
          </button>
          <button
            onClick={() => setActiveTab('challenges')}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === 'challenges' ? 'bg-red-600 text-white font-bold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Training Challenges ({challenges.length})
          </button>
        </div>

        {joinedChallengeNotice && (
          <div className="p-4 bg-emerald-950/60 border border-emerald-500/50 rounded-lg text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{joinedChallengeNotice}</span>
          </div>
        )}

        {/* Feed Tab */}
        {activeTab === 'feed' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Feed & Post Box */}
            <div className="lg:col-span-8 space-y-6">
              {/* Post Composer */}
              <div className="p-5 bg-neutral-900 border border-neutral-800 rounded-xl space-y-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    referrerPolicy="no-referrer"
                    className="w-9 h-9 rounded-full object-cover border border-neutral-700"
                  />
                  <div>
                    <div className="text-xs font-bold text-white">{user.name}</div>
                    <div className="text-[10px] text-neutral-400">Posting to CRAVA MAGA International Network</div>
                  </div>
                </div>

                <form onSubmit={handlePostSubmit} className="space-y-3">
                  <textarea
                    rows={3}
                    value={newPostContent}
                    onChange={e => setNewPostContent(e.target.value)}
                    placeholder="Share technique insights, mat experience, or seminar questions..."
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white focus:outline-none focus:border-red-500 placeholder-neutral-500 resize-none"
                  />

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-neutral-400 text-[11px]">Discipline:</span>
                      <select
                        value={selectedTag}
                        onChange={e => setSelectedTag(e.target.value as DisciplineId)}
                        className="px-2.5 py-1 bg-neutral-950 border border-neutral-800 rounded text-neutral-300 text-xs uppercase"
                      >
                        <option value="krav-maga">Krav Maga</option>
                        <option value="boxing">Boxing</option>
                        <option value="bjj">Brazilian Jiu-Jitsu</option>
                        <option value="muay-thai">Muay Thai</option>
                        <option value="self-defense">Self-Defense</option>
                        <option value="fitness">Fitness</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={!newPostContent.trim()}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-neutral-800 text-white font-bold text-xs rounded-md shadow-md shadow-red-600/30 flex items-center gap-1.5 transition-all"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Post to Mat</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Posts Feed */}
              <div className="space-y-4">
                {posts.map(p => (
                  <div key={p.id} className="p-5 bg-neutral-900 border border-neutral-800 rounded-xl space-y-4 shadow-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.authorAvatar}
                          alt={p.authorName}
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 rounded-full object-cover border border-neutral-700"
                        />
                        <div>
                          <div className="font-bold text-white text-xs">{p.authorName}</div>
                          <div className="text-[10px] text-neutral-400">
                            {p.authorRole} · {p.timestamp}
                          </div>
                        </div>
                      </div>

                      <span className="text-[10px] font-bold px-2 py-0.5 rounded border border-neutral-700 bg-neutral-950 text-neutral-300 uppercase">
                        {p.disciplineTag}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
                      {p.content}
                    </p>

                    <div className="pt-3 border-t border-neutral-800 flex items-center gap-6 text-xs text-neutral-400">
                      <button className="flex items-center gap-1.5 hover:text-red-500 transition-colors">
                        <Heart className="w-4 h-4 text-red-500 fill-red-500/20" />
                        <span className="font-semibold tabular-nums">{p.likes}</span>
                      </button>
                      <button className="flex items-center gap-1.5 hover:text-white transition-colors">
                        <MessageSquare className="w-4 h-4 text-neutral-500" />
                        <span className="font-semibold tabular-nums">{p.commentsCount} comments</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Community Guilds & Guidelines */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-5 bg-neutral-900 border border-neutral-800 rounded-xl space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase text-white">
                  <Shield className="w-4 h-4 text-red-500" />
                  <span>Dojo Honor Code</span>
                </div>
                <ul className="text-xs text-neutral-400 space-y-2 leading-relaxed">
                  <li>• Respect all training partners regardless of rank or discipline.</li>
                  <li>• Keep ego outside the dojo mat and online forums.</li>
                  <li>• Constructive technique criticism only; safety comes first.</li>
                  <li>• Zero tolerance for hate speech or malicious harassment.</li>
                </ul>
              </div>

              <div className="p-5 bg-neutral-900 border border-neutral-800 rounded-xl space-y-3">
                <div className="text-xs font-bold uppercase text-neutral-300 flex items-center justify-between">
                  <span>Regional Circles</span>
                  <Users className="w-3.5 h-3.5 text-neutral-500" />
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-neutral-950 border border-neutral-800 rounded flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white">Kigali Combat Guild</div>
                      <div className="text-[11px] text-neutral-400">1,240 Active Members</div>
                    </div>
                    <span className="text-[10px] text-red-400 font-semibold">Active</span>
                  </div>
                  <div className="p-3 bg-neutral-950 border border-neutral-800 rounded flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white">Women Self-Defense Circle</div>
                      <div className="text-[11px] text-neutral-400">890 Active Members</div>
                    </div>
                    <span className="text-[10px] text-red-400 font-semibold">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Challenges Tab */}
        {activeTab === 'challenges' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {challenges.map(ch => (
              <div key={ch.id} className="p-6 bg-neutral-900 border border-neutral-800 rounded-xl space-y-5 flex flex-col justify-between shadow-xl">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-neutral-400">
                    <span className="flex items-center gap-1 text-red-500 font-bold">
                      <Flame className="w-4 h-4 fill-current" />
                      <span>{ch.duration}</span>
                    </span>
                    <span>{ch.participants} enrolled</span>
                  </div>

                  <h3 className="font-display text-xl font-bold uppercase text-white leading-tight">
                    {ch.title}
                  </h3>

                  <div className="p-3 bg-neutral-950 border border-neutral-800 rounded text-xs text-neutral-300">
                    <div className="text-[10px] text-neutral-500 uppercase font-semibold">Honor & Completion Reward:</div>
                    <div className="font-bold text-amber-400 mt-0.5">{ch.reward}</div>
                  </div>
                </div>

                <button
                  onClick={() => handleJoinChallenge(ch.title)}
                  className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded transition-colors"
                >
                  Join Challenge
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
