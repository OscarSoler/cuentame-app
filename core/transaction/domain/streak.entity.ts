export interface ActivityStatsConfig {
  score: number;
  currentStreak: number;
  activeDaysThisWeek: number[];
}

export class ActivityStats {
  readonly score: number;
  readonly currentStreak: number;
  readonly activeDaysThisWeek: number[];

  constructor(config: ActivityStatsConfig) {
    this.score = config.score;
    this.currentStreak = config.currentStreak;
    this.activeDaysThisWeek = config.activeDaysThisWeek;
  }
}
