'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { calculateCIDR, isValidIP } from '@/utils/cidr'
import Link from 'next/link'
import { Terminal } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export default function CIDRCalculator() {
  const [ipAddress, setIpAddress] = useState('0.0.0.0')
  const [maskBits, setMaskBits] = useState('1')
  const [results, setResults] = useState({
    networkAddress: '0.0.0.0',
    wildcardMask: '127.255.255.255',
    startIP: '0.0.0.0',
    endIP: '127.255.255.255',
    maxAddresses: 2147483646,
    maxSubnets: 2147483648,
    cidrNotation: '0.0.0.0/1',
    netmask: '128.0.0.0'
  })

  useEffect(() => {
    if (isValidIP(ipAddress)) {
      const result = calculateCIDR(ipAddress, parseInt(maskBits))
      setResults(result)
    }
  }, [ipAddress, maskBits])

  return (
    <>
      <Card className="w-full max-w-4xl mx-auto bg-slate-50 dark:bg-slate-900">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">CIDR Calculator</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ip-address">IP Address</Label>
              <Input
                id="ip-address"
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mask-bits">Mask Bits</Label>
              <Select value={maskBits} onValueChange={setMaskBits}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 32 }, (_, i) => i + 1).map((bits) => (
                    <SelectItem key={bits} value={bits.toString()}>
                      {bits}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>CIDR Netmask</Label>
              <Input
                value={results.netmask}
                readOnly

              />
            </div>
            <div className="space-y-2">
              <Label>Wildcard Mask</Label>
              <Input
                value={results.wildcardMask}
                readOnly

              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Maximum Subnets</Label>
              <Input
                value={results.maxSubnets.toLocaleString()}
                readOnly

              />
            </div>
            <div className="space-y-2">
              <Label>Maximum Addresses</Label>
              <Input
                value={results.maxAddresses.toLocaleString()}
                readOnly

              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>CIDR Network (Route)</Label>
              <Input
                value={results.networkAddress}
                readOnly

              />
            </div>
            <div className="space-y-2">
              <Label>Net: CIDR Notation</Label>
              <Input
                value={results.cidrNotation}
                readOnly

              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>CIDR Address Range</Label>
            <Input
              value={`${results.startIP} - ${results.endIP}`}
              readOnly

            />
          </div>
        </CardContent>
      </Card>
      <Alert className="mt-4">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          This CIDR Calculator is inspired by <Link href="https://www.subnet-calculator.com/cidr.php">subnet-calculator.com.</Link> Many features are still being refined, and I'm also learning more about networking. If you have any questions, feel free to discuss them with me on <Link href="https://github.com/1chooo/tools/issues">GitHub Issues.</Link>
        </AlertDescription>
      </Alert>
    </>
  )
}
