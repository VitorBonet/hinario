"use client"

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface IMusicProps {
  title: string;
  lyrics: string;
  notes: {
    key: string;
    note: string;
    position: number;
  }[];
}

export function Music({
  title,
  lyrics,
  notes,
}: IMusicProps) {
  const [chords, setChords] = useState("");
  const [tom, setTom] = useState("");

  const selectTomChange = (value: string) => {
    setTom(value);
  }

  const buildMusic = async () => {
    let newChords = lyrics;
    const notesBuildMusic = notes.map((note, i) => {
      if (i == 0) {
        newChords = newChords.slice(0, note.position) + `<span style="position: absolute;margin-top: -1rem;">${note.note}</span>` + newChords.slice(note.position);
      } else {
        const pos = note.position+(i*60);
        newChords = newChords.slice(0, pos) + `<span style="position: absolute;margin-top: -1rem;">${note.note}</span>` + newChords.slice(pos);
      }
    });
    await Promise.all(notesBuildMusic);
    newChords = newChords.replace(/\n/g, "<br/><br/>");
    newChords = newChords.replace(/\\n/g, "<br/><br/>");
    setChords(newChords);
  }

  useEffect(() => {
    buildMusic();
  }, [notes])

  return (
    <div>
      <div>
        <div className="flex gap-4">
          <h3 className="text-2xl tracking-tight">{title}</h3>
          <Select onValueChange={selectTomChange} defaultValue={notes[0].key}>
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder="Tom" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Toms</SelectLabel>
                <SelectItem value="C">C</SelectItem>
                <SelectItem value="G">G</SelectItem>
                <SelectItem value="D">D</SelectItem>
                <SelectItem value="A">A</SelectItem>
                <SelectItem value="E">E</SelectItem>
                <SelectItem value="B">B</SelectItem>
                <SelectItem value="F#">F#</SelectItem>
                <SelectItem value="C#">C#</SelectItem>
                <SelectItem value="Ab">Ab</SelectItem>
                <SelectItem value="Eb">Eb</SelectItem>
                <SelectItem value="Bb">Bb</SelectItem>
                <SelectItem value="F">F</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <p className="text-sm tracking-tight mt-4"> 
          <div dangerouslySetInnerHTML={{__html: chords}}></div>
        </p>
      </div>
    </div>
  )
}
