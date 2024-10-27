'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function EmailPredictor() {
  const [emailText, setEmailText] = useState('')
  const [prediction, setPrediction] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: emailText }),
      })

      const data = await response.json()
      setPrediction(data.prediction)
    } catch (error) {
      console.error('Error making prediction:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="backdrop-blur-sm bg-white/80">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-gray-800">Email Analysis Tool</CardTitle>
            <CardDescription className="text-center text-gray-600">
              Paste the content of your email to receive an analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Textarea
                placeholder="Type your email content here..."
                value={emailText}
                onChange={(e) => setEmailText(e.target.value)}
                className="min-h-[200px] resize-none"
                required
              />
              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <Send className="mr-2 h-4 w-4" /> Analyze
                  </span>
                )}
              </Button>
            </form>
            {prediction && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-100"
              >
                <h3 className="font-semibold text-xl mb-2 text-indigo-700">Analysis Result:</h3>
                <p className="text-indigo-800">{prediction}</p>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
      </motion.div>
    </div>
  )
}