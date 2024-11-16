"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, CheckCircle2, ExternalLink } from 'lucide-react'
import { ethers } from "ethers"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface TransactionState {
  isLoading: boolean
  isSuccess: boolean
  hash?: string
}


export default function DonateDialog({ 
  params,
  signer,
  donationInWei,
  DONATE_ABI, 
  disabled, 
}: { 
  params: string
  signer: ethers.Signer
  donationInWei: ethers.BigNumber
  DONATE_ABI: any
  disabled: boolean
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [txState, setTxState] = useState<TransactionState>({
    isLoading: false,
    isSuccess: false
  })

  async function donate() {
    if (!signer) return
    
    setIsOpen(true)
    setTxState({ isLoading: true, isSuccess: false })
    
    const contract = new ethers.Contract(
      params as string,
      DONATE_ABI,
      signer
    )

    try {
      const tx = await contract.fund({
        value: donationInWei,
      })

      console.log("Transaction sent:", tx.hash)
      setTxState({ isLoading: true, isSuccess: false, hash: tx.hash })

      const receipt = await tx.wait()
      console.log("Transaction mined:", receipt)
      setTxState({ isLoading: false, isSuccess: true, hash: tx.hash })

    } catch (error) {
      console.error("Error sending transaction:", error)
      setTxState({ isLoading: false, isSuccess: false })
      setIsOpen(false)
    }
  }

  return (
    <>
      <Button onClick={donate} className="w-full" 
                      disabled={disabled}
                >
        Donate
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Transaction Status</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-8">
            <AnimatePresence mode="wait">
              {txState.isLoading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex flex-col items-center gap-4"
                >
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="text-sm text-muted-foreground">
                    {txState.hash ? "Confirming transaction..." : "Waiting for confirmation..."}
                  </p>
                </motion.div>
              )}

              {txState.isSuccess && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex flex-col items-center gap-4"
                >
                  <CheckCircle2 className="h-8 w-8 text-green-500" />
                  <p className="text-center font-medium">Transaction Successful!</p>
                  <a
                    href={`https://eth-sepolia.blockscout.com/tx/${txState.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    View on Explorer
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}