"use client"

import React from "react"
import { Textarea } from "@/components/ui/text-area"
import Container from "@/components/container"
import Title from "@/components/title"

export default function MarkdownPreviewer() {
  const [value, setValue] = React.useState("")
  const words = value.match(/\S+/g)?.length || 0
  const chars = value.length || 0
  const charsWithoutSpaces = value.replaceAll(" ", "").length || 0
  const paragraphs = value.split("\n").filter((paragraph) => paragraph !== "").length || 0

  return (
    <Container className="flex flex-col items-center justify-center">
      <Title title="Markdown Previewer" />
      <div className="my-12 grid w-full grid-cols-2 gap-2 sm:grid-cols-4">
        <div className="h-24 w-full rounded-lg border p-3">
          <div className="text-2xl font-bold">{words}</div>
          <div className="text-xs font-bold text-muted-foreground">words</div>
        </div>
        <div className="h-24 w-full rounded-lg border p-3">
          <div className="text-2xl font-bold">{chars}</div>
          <div className="text-xs font-bold text-muted-foreground">characters</div>
        </div>
        <div className="h-24 w-full rounded-lg border p-3">
          <div className="text-2xl font-bold">{charsWithoutSpaces}</div>
          <div className="text-xs font-bold text-muted-foreground">characters without spaces</div>
        </div>
        <div className="h-24 w-full rounded-lg border p-3">
          <div className="text-2xl font-bold">{paragraphs}</div>
          <div className="text-xs font-bold text-muted-foreground">paragraphs</div>
        </div>
      </div>

      <div className="w-full space-y-4 md:flex md:space-x-4 md:space-y-0">
        <div className="w-full md:w-1/2">
          <Textarea
            placeholder="Type here ..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="min-h-[300px]"
          />
        </div>
        <div className="w-full md:w-1/2 shadow-md">
          <div className="rounded-md border p-4 min-h-[300px] whitespace-pre-wrap">{value}</div>
        </div>
      </div>
    </Container>
  )
}

