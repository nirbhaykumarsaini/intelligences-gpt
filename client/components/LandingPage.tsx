import { Lightbulb, NotebookText, Wand2 } from 'lucide-react'
import React from 'react'

const LandingPage = () => {
  return (
    <div className="mt-8 text-center">
                <div className="mx-auto max-w-2xl">
                 
                  <h2 className="text-2xl font-semibold text-gray-700 mt-6">
                    Your Digital Assistant is Ready
                  </h2>
                  <p className="text-gray-500 mt-2">
                    Ask me anything or try one of these examples:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
                      <div className="flex justify-center">
                        <Lightbulb className="h-8 w-8 text-purple-500" />
                      </div>
                      <h3 className="mt-4 font-medium text-gray-700">
                        Brainstorm Ideas
                      </h3>
                      <p className="text-sm text-gray-500 mt-2">
                        Suggest creative ways to promote a new product
                      </p>
                    </div>

                    <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
                      <div className="flex justify-center">
                        <NotebookText className="h-8 w-8 text-blue-500" />
                      </div>
                      <h3 className="mt-4 font-medium text-gray-700">
                        Get Summaries
                      </h3>
                      <p className="text-sm text-gray-500 mt-2">
                        Summarize the latest advancements in AI technology
                      </p>
                    </div>

                    <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
                      <div className="flex justify-center">
                        <Wand2 className="h-8 w-8 text-green-500" />
                      </div>
                      <h3 className="mt-4 font-medium text-gray-700">
                        Creative Solutions
                      </h3>
                      <p className="text-sm text-gray-500 mt-2">
                        Help me write a catchy slogan for a coffee shop
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-center gap-4">
                    <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm">
                      💡 Pro Tip: Start with How can I...
                    </div>
                    <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm">
                      ✨ Try: Explain quantum computing simply
                    </div>
                  </div>
                </div>
              </div>
  )
}

export default LandingPage
