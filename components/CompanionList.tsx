import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, getSubjectColor } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface CompanionListProps {
  // title: string;
  companions?: Companion[];
  classNames?: string;
}

const CompanionList = ({
  // title,
  companions,
  classNames,
}: CompanionListProps) => {
  return (
    <article
      className={cn(
        " rounded-4xl border border-black px-7 pt-7 pb-10 max-lg:w-full bg-white",
        classNames
      )}
    >
      <h2 className="font-bold text-3xl">Recent Sessions</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-lg width-2/3">Lessons</TableHead>
            <TableHead className="text-lg">Subject</TableHead>
            <TableHead className="text-lg text-right">Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companions && companions.length > 0 ? (
            companions.map(({ id, name, topic, duration, subject }) => (
              <TableRow key={id}>
                <TableCell>
                  <Link href={`/companions/${id}`}>
                    <div className="flex items-center gap-2">
                      <div
                        className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden"
                        style={{ backgroundColor: getSubjectColor(subject) }}
                      >
                        <Image
                          src={`/icons/${subject}.svg`}
                          alt={subject}
                          width={35}
                          height={35}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="font-bold text-2xl">{name}</p>
                        <p className="text-lg">{topic}</p>
                      </div>
                    </div>
                  </Link>
                </TableCell>
                <TableCell>
                  <div className=" bg-black text-white rounded-4xl text-sm px-2 py-1 capitalize w-fit font-semibold max-md:hidden">
                    {subject.toUpperCase()}
                  </div>
                  <div className="flex items-center justify-center rounded-lg w-fit md:hidden p-2" style={{ backgroundColor: getSubjectColor(subject) }}>
                    <Image
                      src={`/icons/${subject}.svg`}
                      alt={subject}
                      width={18}
                      height={18}
                      />
                  </div>
                </TableCell>
                <TableCell className="text-right flex items-center justify-center gap-2 mt-5 font-bold"><Image src='icons/clock.svg' alt='duration' width={14} height={14} />{duration}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                No companions found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </article>
  );
};

export default CompanionList;
