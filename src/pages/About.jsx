export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* Hero Section */}
      <div className="relative bg-black/90 border-b border-gray-700">
        <div className="container mx-auto px-4 py-16 md:py-24 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-wider mb-6 text-white">
            ABOUT SOUL
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            More than just a clan. We are a <span className="text-red-700 font-bold">family</span> bound by loyalty, honor, and the unbreakable bond of brotherhood.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Our Story */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-black/80 border border-gray-700 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-wider mb-6 text-red-700">OUR STORY</h2>
            <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
              <p>
                SOUL was forged in the heat of battle, born from the shared struggles and triumphs of warriors who refused to stand alone. What started as a small group of dedicated players has grown into a formidable family that spans continents and time zones.
              </p>
              <p>
                Through countless raids, epic victories, and even devastating defeats, we have learned one fundamental truth: <span className="text-white font-bold">together, we are strongest</span>. Every member brings their unique strengths, and together we create something greater than the sum of our parts.
              </p>
              <p>
                We don't just play games—we build memories, forge friendships, and create a legacy that will endure long after the servers go dark. SOUL is not just our name; it's who we are at our core.
              </p>
            </div>
          </div>
        </div>

        {/* Core Values Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-black/80 border border-gray-700 p-6 md:p-8 hover:border-red-700 transition-colors">
            <div className="text-4xl mb-4">🛡️</div>
            <h3 className="text-2xl font-bold tracking-wider mb-3 text-white">LOYALTY</h3>
            <p className="text-gray-400">
              We stand by each other through thick and thin. Your battles are our battles. Your victories are our victories. We never leave a soldier behind.
            </p>
          </div>

          <div className="bg-black/80 border border-gray-700 p-6 md:p-8 hover:border-red-700 transition-colors">
            <div className="text-4xl mb-4">⚔️</div>
            <h3 className="text-2xl font-bold tracking-wider mb-3 text-white">STRENGTH</h3>
            <p className="text-gray-400">
              United we stand, divided we fall. Our strength comes not from individual skill alone, but from our unwavering unity and coordinated teamwork.
            </p>
          </div>

          <div className="bg-black/80 border border-gray-700 p-6 md:p-8 hover:border-red-700 transition-colors">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-2xl font-bold tracking-wider mb-3 text-white">FAMILY</h3>
            <p className="text-gray-400">
              SOUL is more than a gaming clan—we're a family. We celebrate together, support each other, and grow stronger with every challenge we face.
            </p>
          </div>
        </div>

        {/* What Makes Us Different */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-black/80 border border-gray-700 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-wider mb-8 text-red-700 text-center">
              WHAT MAKES US DIFFERENT
            </h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="text-red-700 text-2xl font-bold min-w-[40px]">01</div>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-white">We Put People First</h4>
                  <p className="text-gray-400">
                    Skills can be learned, tactics can be taught, but character and loyalty are what truly matter. We recruit hearts before we recruit headshots.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-red-700 text-2xl font-bold min-w-[40px]">02</div>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-white">We've Faced Every Storm</h4>
                  <p className="text-gray-400">
                    Through game updates that broke our strategies, members moving on to new chapters, and battles that seemed impossible—we've weathered it all and emerged stronger each time.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-red-700 text-2xl font-bold min-w-[40px]">03</div>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-white">We Build Legends Together</h4>
                  <p className="text-gray-400">
                    Every member has a story. Every battle adds to our legacy. We don't just make plays—we make history, one coordinated strike at a time.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-red-700 text-2xl font-bold min-w-[40px]">04</div>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-white">We Never Stop Growing</h4>
                  <p className="text-gray-400">
                    From veteran commanders to fresh recruits, we all share knowledge, teach each other, and elevate our game. Your growth is our success.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The SOUL Oath */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="bg-gradient-to-r from-red-900/20 via-black/80 to-red-900/20 border border-red-700 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-wider mb-6 text-center text-red-700">
              THE SOUL OATH
            </h2>
            <div className="text-center space-y-4 text-lg text-gray-200 italic leading-relaxed">
              <p>"We are SOUL—unbreakable, unstoppable, united."</p>
              <p>"We fight not for glory alone, but for the brother and sister at our side."</p>
              <p>"In victory, we celebrate together. In defeat, we rise together."</p>
              <p>"Our bond is forged in fire, tempered by time, and unshakable by any force."</p>
              <p className="text-white font-bold not-italic text-2xl mt-6">
                TOGETHER, WE STAND STRONG.
              </p>
            </div>
          </div>
        </div>

        {/* Join Us CTA */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-black/80 border border-gray-700 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-wider mb-4 text-white">
              READY TO JOIN THE FAMILY?
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              SOUL is always looking for dedicated warriors who value loyalty, teamwork, and brotherhood. If you're ready to be part of something bigger than yourself, we're ready to welcome you home.
            </p>
            <a 
              href="/contact"
              className="bg-transparent border-2 border-red-700 hover:bg-red-700 text-white font-bold py-4 px-8 tracking-wider transition-colors inline-block"
            >
              CONTACT ME DIRECTLY
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}