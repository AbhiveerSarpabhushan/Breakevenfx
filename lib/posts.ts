export type Post = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content: string[];
};

// To add a new post: copy one of the objects below, give it a unique `slug`,
// fill in the fields, and write `content` as an array of paragraph strings.
// The blog index (/blog) and the post page (/blog/[slug]) read from here.
export const posts: Post[] = [
  {
    slug: "why-traders-fail-funded-accounts",
    title:
      "Why Most Traders Fail Their First Funded Account (And How to Fix It)",
    date: "March 12, 2026",
    category: "Risk Management",
    excerpt:
      "Passing a funded account challenge is one thing. Keeping the account is another. Most traders fail not because their strategy is wrong but because their risk management falls apart the moment real money is involved.",
    content: [
      "Passing the challenge feels like the hard part. You hit the profit target, you stay under the drawdown limit, and you get the email saying you're funded. Then something strange happens. The same person who traded patiently during the evaluation suddenly can't sit still. The account is real now, the payouts are real, and that pressure changes how you see every single setup. I've watched it happen to dozens of traders, and I lived it myself more than once. The problem was never the strategy that got them funded — it was what the money did to their decision-making.",
      "When real money is on the line, most traders quietly abandon the exact rules that got them there. The plan said one percent risk, but this setup looks too good, so it becomes two. The plan said walk away after two losses, but they're down and they want it back, so they take a third trade that isn't really there. None of this feels reckless in the moment. It feels like conviction. That's the trap — bad risk management almost always disguises itself as confidence, and you only see it clearly after the account is gone.",
      "The fix isn't complicated, but it is boring, and that's why people skip it. Fix your risk per trade before the session starts and never touch it mid-trade. Decide your maximum loss for the day and actually close the platform when you hit it. Size every position off your stop distance, not off how good you feel about the idea. Keep a hard rule against adding to losers. These habits are unglamorous and they will never go viral, but they are the entire difference between traders who keep funded accounts and traders who collect another failed challenge every month.",
      "Here's the thing I wish someone had drilled into me sooner: a funded account doesn't reward your biggest wins, it punishes your biggest losses. Consistency beats brilliance every time in this game. You don't need a hero trade to keep the account — you need to not blow it. Protect the downside obsessively, let the upside take care of itself, and you'll already be ahead of the vast majority of people who pass the challenge and lose it weeks later. That's not a strategy secret. It's just discipline, applied when it actually costs you something.",
    ],
  },
  {
    slug: "mindset-shift-that-changed-my-trading",
    title: "The Mindset Shift That Changed My Trading Forever",
    date: "February 28, 2026",
    category: "Mindset",
    excerpt:
      "For a long time I thought trading was about finding the right setup. It isn't. The setup is maybe 30% of it. The other 70% is whether you can execute your plan without letting your emotions take over.",
    content: [
      "For my first year I was obsessed with finding the perfect setup. I collected strategies the way some people collect tabs in their browser — a new indicator here, a different confluence model there, always convinced the next one would be the answer. Looking back, that obsession wasn't really about edge. It was a coping mechanism. As long as I was hunting for a better setup, I never had to admit that the real problem was sitting in my chair, not on my chart.",
      "The shift came on a day I took a textbook setup, watched it play out exactly like I'd planned, and still lost money — because I moved my stop, doubled my size, and then bailed at the worst possible point. The setup did its job. I didn't. That was the moment it finally clicked that the setup is maybe thirty percent of this, and the other seventy is whether you can execute your own plan without your emotions hijacking the wheel. No new indicator was going to fix that. Only I could.",
      "So I started training the thing that actually mattered: my response to a losing trade. I stopped treating losses as proof that something was wrong and started treating them as the cost of doing business — a line item I'd already budgeted for. I wrote my rules down before the session and reviewed them after, not to grade my P&L but to grade my discipline. A red day where I followed my plan perfectly started counting as a win. A green day where I broke my rules started counting as a warning. That reframe rewired how I felt about every outcome.",
      "These days the habits that keep me steady are almost embarrassingly simple. I plan the trade before the market opens so I'm not improvising under pressure. I size small enough that no single loss can rattle me. I journal every trade honestly, including the ugly ones, because the patterns only show up when you stop hiding from them. None of this is exciting, and none of it would make a good highlight reel. But it's the work that turned trading from an emotional rollercoaster into a process I can actually repeat — and that, not a better setup, is what changed everything.",
    ],
  },
  {
    slug: "how-i-structure-my-trading-week",
    title: "How I Structure My Trading Week as a Consistent Trader",
    date: "February 10, 2026",
    category: "Strategy",
    excerpt:
      "Consistency in trading doesn't come from trading every day. It comes from having a repeatable process — knowing exactly what you're looking for before the market opens and having the discipline to wait for it.",
    content: [
      "People assume consistency means trading every single day, and that's exactly backwards. Consistency comes from having a repeatable process and the patience to wait for it, which often means doing nothing at all. My week doesn't start when the market opens on Monday. It starts on Sunday, when there's no pressure and no open positions clouding my judgment. That's when I do the work that makes the rest of the week calm instead of chaotic.",
      "On Sundays I build my bias. I go through the higher timeframes on the pairs I actually trade, mark the levels that matter, and write down what I expect price to do and — just as importantly — what would tell me I'm wrong. I'm not predicting the future here. I'm narrowing the field so that when Monday comes, I already know which scenarios I care about and which noise I can ignore. A clear bias built in a quiet moment is worth ten reactive decisions made in the heat of a fast market.",
      "My mornings before the open are a routine, not a scramble. I review the levels I drew on Sunday, check whether anything has shifted overnight, and pick the one or two setups that would actually get me to act. Then I make the most important decision of the day: is today even worth trading? Some days the market is choppy, the levels are far away, and the right move is to sit on my hands. Learning to call a day 'no trade' before I've risked a cent has saved me more money than any setup I've ever found. Not every session deserves your capital.",
      "Then on Fridays I close the loop. I go back through every trade I took that week — entries, exits, and the reasoning behind each one — and I'm honest about where I followed my plan and where I didn't. I'm not chasing a bigger number; I'm looking for patterns in my own behavior. The mistakes that show up two or three weeks in a row are the ones worth fixing. That weekly review is the quiet engine behind any consistency I have. Trading isn't really a daily game. It's a weekly process that happens to play out one day at a time.",
    ],
  },
];

export function getAllPosts(): Post[] {
  return posts;
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}
